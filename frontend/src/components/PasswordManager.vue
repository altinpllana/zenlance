<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12">
        <v-btn color="primary" @click="openAddPasswordModal">Add New Password</v-btn>

        <v-data-table :headers="headers.value" :items="passwords">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon small @click="editPassword(item)">mdi-delete</v-btn>
            <v-btn icon small @click="removePassword(item)">mdi-delete</v-btn>
          </template>
        </v-data-table>

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
export default {
  data() {
    return {
      headers: [
        { text: "URL", value: "url" },
        { text: "Password", value: "password" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      passwords: [],
      showAddPasswordModal: false,
      newPassword: { url: "", password: "" },
      showPassword: false,
      passwordStrength: 0,
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
    openAddPasswordModal() {
      this.showAddPasswordModal = true;
      this.newPassword = { url: "", password: "" };
      this.passwordStrength = 0;
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

      // A basic strength calculation
      this.passwordStrength =
        (length >= 8 ? 25 : 0) +
        (hasUpper ? 25 : 0) +
        (hasLower ? 15 : 0) +
        (hasNumber ? 20 : 0) +
        (hasSpecial ? 15 : 0);
    },
    savePassword() {
      if (this.newPassword.url && this.newPassword.password) {
        this.passwords.push({ ...this.newPassword });
        this.closeAddPasswordModal();
      }
    },
    editPassword(item) {
      console.log("Editing password for:", item);
    },
    removePassword(item) {
      this.passwords = this.passwords.filter((password) => password !== item);
    },
  },
  watch: {
    "newPassword.password": "checkPasswordStrength",
  },
};
</script>

<style scoped></style>
