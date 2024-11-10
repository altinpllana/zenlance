<template>
  <v-container>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
    </v-snackbar>

    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="7" lg="7">
            <div class="welcome-text text-center mb-10">
              <div class="logo-container">
                <img class="mb-4 fadeIn" width="350" src="@/assets/zenlance-black.svg" />
              </div>
              <h3>Welcome Back</h3>
              <p class="text-grey">Please enter your details.</p>
            </div>
            <v-form>
              <v-text-field
                type="text"
                variant="solo"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                type="password"
                variant="solo"
                v-model="password"
                label="Password"
              ></v-text-field>
              <div class="text-center forgot-password">
                <v-btn variant="text" @click="forgottenPassword"
                  >Forgotten password?</v-btn
                >
              </div>
              <v-btn
                block
                variant="flat"
                size="x-large"
                @click="login"
                color="primary"
                :disabled="isLoginDisabled"
                >Login</v-btn
              >
              <div class="text-center mt-5">
                <p>
                  Don't have an account?
                  <v-btn variant="text" color="primary" @click="register">Register</v-btn>
                </p>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router/index.js";
import { supabase } from "@/services/supabaseClient";

export default {
  data() {
    return {
      email: "ip@gmail.com",
      password: "123123123",
      snackbar: {
        show: false,
        text: "",
      },
    };
  },
  computed: {
    isLoginDisabled() {
      return !(this.email && this.password);
    },
  },
  methods: {
    async login() {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) {
          this.snackbar.show = true
          this.snackbar.text = error.message
          return;
        }

        localStorage.setItem("accessToken", data.session.access_token);

        console.log("User logged in successfully:", data);
        this.snackbar.show = true;
        this.snackbar.text = "Login successful!";
        this.$router.push("/dashboard");
      } catch (error) {
        this.snackbar.show = true
          this.snackbar.text = error.message
      }
    },

    forgottenPassword() {
      router.push("/forgotten-password");
    },

    register() {
      router.push("/register");
    },
  },
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.forgot-password {
  margin-bottom: 15px;
}
</style>
