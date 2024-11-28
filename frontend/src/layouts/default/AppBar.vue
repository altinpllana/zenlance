<template>
  <v-app id="inspire">
    <!-- <PersonalDetailsModal /> -->
    <v-navigation-drawer
      v-model="drawer"
      v-if="!['/login', '/register', '/forgotten-password'].includes($route.path)"
      theme="light"
      class="bg-primary"
    >
      <div class="logo-holder">
        <img
          v-if="drawer !== false"
          class="logo fadeIn"
          src="@/assets/zenlance-cropped.svg"
        />
      </div>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.link">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="bg-white" block>
            Help Center <v-icon class="ml-2" icon="mdi-help"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      v-if="!['/login', '/register', '/forgotten-password'].includes($route.path)"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <img
          v-if="drawer == false"
          class="logo-dark fadeIn"
          src="@/assets/zenlance-black.svg"
        />
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <div class="user-info">
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          :title="this.userInfo?.user_metadata.name"
        ></v-list-item>
      </div>
      <v-btn icon class="bg-white" @click="logOut()"
        ><v-icon class="ml-2" icon="mdi-exit-to-app"></v-icon
      ></v-btn>
    </v-app-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import PersonalDetailsModal from "../../components/modals/PersonalDetailsModal.vue";
import { supabase } from "@/services/supabaseClient";

export default {
  components: { PersonalDetailsModal },
  data: () => ({
    drawer: null,
    items: [
      { text: "Dashboard", icon: "mdi-view-dashboard-outline", link: "/dashboard" },
      {
        text: "Proposal Generator",
        icon: "mdi-square-edit-outline",
        link: "/proposal-generator",
      },
      {
        text: "Project Management",
        icon: "mdi-folder-multiple-outline",
        link: "/project-management",
      },
      {
        text: "Client Management",
        icon: "mdi-account-group-outline",
        link: "/client-management",
      },
      { text: "Tasks", icon: "mdi-checkbox-multiple-marked-outline", link: "/tasks" },
      {
        text: "Profile Optimization",
        icon: "mdi-account-circle-outline",
        link: "/profile-optimization",
      },
      {
        text: "Password Manager",
        icon: "mdi-lock-check-outline",
        link: "/password-manager",
      },
      { text: "Reports", icon: "mdi-chart-line", link: "/reports" },
      { text: "Settings", icon: "mdi-cog-outline", link: "/settings" },
      { text: "Invoices", icon: "mdi-currency-usd", link: "/invoices" },
      { text: "Time Tracking", icon: "mdi-timer-pause-outline", link: "/time-tracking" },
      { text: "Files Manager", icon: "mdi-file-cabinet", link: "/time-tracking" },
    ],
    snackbar: false,
    userInfo: null,
  }),

  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userInfo = user;
      console.log("user", user);
    }
  },

  methods: {
    async logOut() {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error("Error logging out:", error.message);
          return;
        }

        // Clear access token from localStorage
        localStorage.removeItem("accessToken");

        // Redirect to login page
        router.push("/login");
      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
    },
  },
};
</script>

<style>
.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
  box-shadow: none !important;
  border-bottom: solid 1px !important;
  border-color: rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

.quick-action {
  padding: 20px 0px 20px 0px !important;
  transition: 0.3s;
  text-align: center;
}

.quick-action:hover {
  padding: 0px;
}
</style>
