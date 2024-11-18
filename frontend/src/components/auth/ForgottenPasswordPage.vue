<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="7" lg="7">
            <div class="welcome-text text-center mb-10">
              <div class="logo-container">
                <img class="mb-4 fadeIn" width="350" src="@/assets/zenlance-black.svg" />
              </div>
              <h3>Reset Password</h3>
              <p class="text-grey">Please enter your email address.</p>
            </div>
            <v-form @submit.prevent="forgotPassword">
              <v-text-field
                type="email"
                variant="solo"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-btn block variant="flat" size="x-large" type="submit" color="primary"
                >Send Reset Email</v-btn
              >
            </v-form>
            <div class="text-center mt-5">
              <p>
                Remembered your password?
                <v-btn variant="text" color="primary" @click="login">Login</v-btn>
              </p>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";

export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async forgotPassword() {
      try {
        const { error } = await supabase.auth.api.resetPasswordForEmail(this.email, {
          redirectTo: "http://localhost:3000/reset-password", // Update for your reset password page
        });

        if (error) {
          this.errorMessage = error.message;
          this.successMessage = "";
        } else {
          this.successMessage = "Password reset email sent successfully.";
          this.errorMessage = "";
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        this.errorMessage = "An unexpected error occurred.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
