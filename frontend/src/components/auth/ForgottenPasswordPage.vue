<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="7" lg="7">
            <div class="welcome-text text-center mb-10">
              <div class="logo-container">
                <v-img class="logo" src="@/assets/logo-pg.png" width="80" />
              </div>
              <h1>Forgot Password</h1>
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
import router from "@/router/index.js";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    login() {
      router.push("/login");
    },

    async forgotPassword() {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(this.email);
        if (error) {
          this.errorMessage = error.message;
          this.successMessage = "";
        } else {
          this.successMessage = "Password reset email sent successfully.";
          this.errorMessage = "";
        }
      } catch (error) {
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
