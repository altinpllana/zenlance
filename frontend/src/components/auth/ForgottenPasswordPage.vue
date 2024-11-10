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

    forgotPassword() {
      axios
        .post("http://localhost:4000/forgot-password", { email: this.email })
        .then((response) => {
          console.log(response.data);
          alert("Password reset email sent successfully!");
          router.push("/login");
        })
        .catch((error) => {
          console.error("Error sending reset email:", error.response.data.message);
          alert("Error: " + error.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
