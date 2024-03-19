<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row justify="center">
          <v-col cols="12" xs="12" sm="12" md="7" lg="7">
            <div class="welcome-text text-center mb-10">
              <div class="logo-container">
                <v-img class="logo" src="@/assets/logo-pg.png" width="80" />
              </div>
              <h1>Register</h1>
              <p class="text-grey">Please enter your details.</p>
            </div>
            <v-form>
              <v-text-field
                type="text"
                variant="solo-filled"
                v-model="name"
                label="Full Name"
              ></v-text-field>
              <v-text-field
                type="text"
                variant="solo-filled"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                type="password"
                variant="solo-filled"
                v-model="password"
                label="Password"
              ></v-text-field>
              <v-btn block variant="flat" size="x-large" @click="login" color="primary"
                >Register</v-btn
              >

              <div class="text-center mt-5">
                <p>
                  Already have an account?
                  <v-btn variant="text" color="primary" @click="login">Login</v-btn>
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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      router.push("/login");
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
</style>
