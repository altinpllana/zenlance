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
                <v-btn icon small @click="showConfirmDeleteModal(item)"
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
              <v-btn text color="green" @click="removePassword(item)">Delete</v-btn>
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
              <v-btn text color="green" @click="savePassword">Save</v-btn>
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
      showConfirmEditModal: false, // Confirmation modal for editing
      newPassword: { id: null, url: "", username: "", password: "" },
      showPassword: false,
      passwordStrength: 0,
      isEditing: false, // Flag to track if editing or adding
    };
  },
  computed: {
    passwordStrengthLabel() {
      if (this.passwordStrength < 30) return "Weak";
      if (this.passwordStrength < 70) return "Moderate";
      return "Strong";
    },
  },
  methods: {
    async fetchPasswords() {
      const { data, error } = await supabase.from("password_manager").select("*");
      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        this.passwords = data;
      }
    },
    openAddPasswordModal() {
      this.isEditing = false; // Set to add mode
      this.newPassword = { id: null, url: "", username: "", password: "" };
      this.passwordStrength = 0;
      this.showAddPasswordModal = true;
    },
    closeAddPasswordModal() {
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

    async savePassword() {
      if (this.newPassword.url && this.newPassword.password) {
        if (this.isEditing) {
          // Update existing password
          const { error } = await supabase
            .from("password_manager")
            .update({
              url: this.newPassword.url,
              username: this.newPassword.username,
              password: this.newPassword.password,
            })
            .eq("id", this.newPassword.id);

          if (error) {
            console.error("Error updating password:", error);
          } else {
            this.closeAddPasswordModal();
            this.fetchPasswords();
          }
        } else {
          // Insert a new password
          const { data, error } = await supabase.from("password_manager").insert([
            {
              url: this.newPassword.url,
              username: this.newPassword.username,
              password: this.newPassword.password,
            },
          ]);

          if (error) {
            console.error("Error saving password:", error);
          } else {
            this.closeAddPasswordModal();
            this.fetchPasswords();
          }
        }
      }
    },
    confirmEditPassword(item) {
      this.newPassword = { ...item }; // Populate form with selected item’s data
      this.isEditing = true; // Set to edit mode
      this.showConfirmEditModal = true; // Show confirmation modal
    },
    async editPassword() {
      this.showConfirmEditModal = false; // Hide confirmation modal
      this.showAddPasswordModal = true; // Open editing modal
    },
    async removePassword(item) {
      const { error } = await supabase
        .from("password_manager")
        .delete()
        .eq("id", item.id);

      if (error) {
        console.error("Error deleting password:", error);
      } else {
        this.passwords = this.passwords.filter((password) => password.id !== item.id);
      }
    },
  },
  async mounted() {
    await this.fetchPasswords();
  },
  watch: {
    "newPassword.password": "checkPasswordStrength",
  },
};
</script>

<style scoped></style>
