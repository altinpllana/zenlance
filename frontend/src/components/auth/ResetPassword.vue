<template>
  <v-container>
    <h2>Reset Your Password</h2>
    <v-form @submit.prevent="resetPassword">
      <v-text-field
        v-model="newPassword"
        label="New Password"
        type="password"
        outlined
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Reset Password</v-btn>
    </v-form>
    <p v-if="message">{{ message }}</p>
  </v-container>
</template>

<script>
import { useRoute } from "vue-router"; // Assuming you use Vue Router

export default {
  data() {
    return {
      newPassword: "",
      message: "",
    };
  },
  setup() {
    const route = useRoute();
    const token = route.query.token; // Extract the token from the URL
    return { token };
  },
  methods: {
    async resetPassword() {
      if (!this.token) {
        this.message = "Invalid or missing reset token.";
        return;
      }

      try {
        const { error } = await supabase.auth.api.updateUser(this.token, {
          password: this.newPassword,
        });

        if (error) {
          console.error("Error resetting password:", error);
          this.message = "Failed to reset password. Please try again.";
        } else {
          this.message = "Password reset successfully! You can now log in.";
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        this.message = "An unexpected error occurred.";
      }
    },
  },
};
</script>
