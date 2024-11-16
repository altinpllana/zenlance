<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" align="end">
        <v-btn color="primary" @click="openAddPasswordModal">Add New Password</v-btn>

        <div class="card mt-4">
          <div class="card-body">
            <v-data-table :headers="headers" :items="passwords">
              <template v-slot:[`item.url`]="{ item }">
                <p class="text-start">{{ item.url }}</p>
              </template>
              <template v-slot:[`item.username`]="{ item }">
                <p class="text-start">{{ item.username }}</p>
              </template>
              <template v-slot:[`item.password`]="{ item }">
                <p class="text-start">{{ item.password }}</p>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn class="mr-2" icon small @click="editPassword(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn icon small @click="confirmDeletePassword(item)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </div>
        </div>

        <v-dialog v-model="showConfirmDeleteModal" max-width="500px">
          <v-card>
            <v-card-title>Confirm Delete</v-card-title>
            <v-card-text> Are you sure you want to delete this password? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="showConfirmDeleteModal = false"
                >Cancel</v-btn
              >
              <v-btn text color="green" @click="deletePassword(item)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showAddPasswordModal" max-width="500px">
          <v-card>
            <v-card-title>Add New Password</v-card-title>
            <v-card-text>
              <v-text-field
                variant="solo"
                label="URL"
                v-model="newPassword.url"
              ></v-text-field>

              <v-text-field
                variant="solo"
                label="Username"
                v-model="newPassword.username"
              ></v-text-field>

              <v-text-field
                label="Password"
                variant="solo"
                v-model="newPassword.password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-btn text color="primary" @click="generatePassword"
                >Generate Password</v-btn
              >

              <v-progress-linear
                :value="passwordStrength"
                color="green"
                height="8"
                width="5"
                class="mt-2"
              ></v-progress-linear>
              <div>Password Strength: {{ passwordStrengthLabel }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="closeAddPasswordModal">Cancel</v-btn>
              <v-btn v-if="isEditing != true" text color="green" @click="savePassword"
                >Save</v-btn
              >
              <v-btn v-if="isEditing == true" text color="green" @click="updatePassword"
                >Update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";
export default {
  data() {
    return {
      headers: [
        { title: "URL", value: "url", align: "start" },
        { title: "Username", value: "username" },
        { title: "Password", value: "password" },
        {
          title: "Actions",
          value: "actions",
          align: "end",
          sortable: false,
          width: "200px",
        },
      ],
      passwords: [],
      showAddPasswordModal: false,
      showConfirmDeleteModal: false,
      newPassword: { id: null, url: "", username: "", password: "" },
      showPassword: false,
      passwordStrength: 0,
      isEditing: false,
      userId: null,
      passwordToDelete: null,
    };
  },
  computed: {
    passwordStrengthLabel() {
      if (this.passwordStrength < 30) return "Weak";
      if (this.passwordStrength < 70) return "Moderate";
      return "Strong";
    },
  },
  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchPasswords();
    }
  },
  methods: {
    async fetchPasswords() {
      if (!this.userId) return;

      const { data, error } = await supabase
        .from("password_manager")
        .select("*")
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        this.passwords = data;
      }
    },
    openAddPasswordModal() {
      this.isEditing = false;
      this.newPassword = { id: null, url: "", username: "", password: "" };
      this.passwordStrength = 0;
      this.showAddPasswordModal = true;
    },
    editPassword(item) {
      this.isEditing = true;
      this.newPassword = { ...item };
      this.showAddPasswordModal = true;
    },
    closeAddPasswordModal() {
      this.showAddPasswordModal = false;
    },
    closeEditPasswordModal() {
      this.showAddPasswordModal = false;
    },
    generatePassword() {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
      this.newPassword.password = Array.from({ length: 12 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
      this.checkPasswordStrength();
    },
    checkPasswordStrength() {
      const length = this.newPassword.password.length;
      const hasUpper = /[A-Z]/.test(this.newPassword.password);
      const hasLower = /[a-z]/.test(this.newPassword.password);
      const hasNumber = /\d/.test(this.newPassword.password);
      const hasSpecial = /[!@#$%^&*()]/.test(this.newPassword.password);

      this.passwordStrength =
        (length >= 8 ? 25 : 0) +
        (hasUpper ? 25 : 0) +
        (hasLower ? 15 : 0) +
        (hasNumber ? 20 : 0) +
        (hasSpecial ? 15 : 0);
    },

    async updatePassword() {
      if (this.isEditing == true) {
        const { error } = await supabase
          .from("password_manager")
          .update({
            url: this.newPassword.url,
            username: this.newPassword.username,
            password: this.newPassword.password,
          })
          .eq("id", this.newPassword.id)
          .eq("user_id", this.userId);

        if (error) {
          console.error("Error saving password:", error);
        } else {
          this.closeEditPasswordModal();
          this.fetchPasswords();
        }
      }
    },

    async savePassword() {
      if (this.isEditing != true) {
        const { data, error } = await supabase.from("password_manager").insert([
          {
            url: this.newPassword.url,
            username: this.newPassword.username,
            password: this.newPassword.password,
            user_id: this.userId,
          },
        ]);

        if (error) {
          console.error("Error saving password:", error);
        } else {
          this.closeAddPasswordModal();
          this.fetchPasswords();
        }
      }
    },
    confirmDeletePassword(item) {
      this.passwordToDelete = item;
      this.showConfirmDeleteModal = true; 
    },
    async deletePassword() {
      if (this.passwordToDelete) {
        const { error } = await supabase
          .from("password_manager")
          .delete()
          .eq("id", this.passwordToDelete.id)
          .eq("user_id", this.userId); 

        if (error) {
          console.error("Error deleting password:", error);
        } else {
          this.showConfirmDeleteModal = false;
          this.fetchPasswords();
        }
      }
    },
  },
  watch: {
    "newPassword.password": "checkPasswordStrength",
  },
};
</script>

<style scoped></style>
