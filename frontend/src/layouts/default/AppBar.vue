<template>
  <v-app id="inspire">
    <!-- <PersonalDetailsModal /> -->
    <v-navigation-drawer v-model="drawer" theme="dark" class="bg-primary" permanent>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          title="Jane Smith"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="bg-white" block @click="logOut()">
            Logout <v-icon class="ml-2" icon="mdi-exit-to-app"></v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>WorkWave</v-app-bar-title>
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
export default {
  components: { PersonalDetailsModal },
  data: () => ({
    drawer: null,
    items: [
      { text: "Dashboard", icon: "mdi-square-edit-outline", link: '/dashboard' },
      { text: "Proposal Generator", icon: "mdi-square-edit-outline", link: '/proposal-generator' },
      { text: "Profile Optimization", icon: "mdi-account-circle-outline", link: '/profile-optimization' },
      { text: "Invoices", icon: "mdi-currency-usd", link: '/invoices' },
      { text: "Time Tracking", icon: "mdi-timer-pause-outline", link: '/time-tracking' },
      { text: "Project Management", icon: "mdi-folder-multiple-outline", link: '/clients' },
      { text: "Client Management", icon: "mdi-account-group-outline", link: '/projects' },
      { text: "Reports", icon: "mdi-chart-line", link: '/reports' },
      { text: "Settings", icon: "mdi-cog-outline", link: 'settings' },
    ],
    snackbar: false,
  }),

  methods: {
    logOut() {
      router.push("/login");
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
</style>
