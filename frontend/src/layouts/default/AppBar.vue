<template>
  <v-app id="inspire">
    <PersonalDetailsModal />
    <v-navigation-drawer v-model="drawer" theme="dark" class="bg-black" permanent>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          subtitle="Logged in"
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

      <v-app-bar-title>Proposal Generator</v-app-bar-title>
    </v-app-bar>

    <v-main> </v-main>
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
      { text: "Proposal Generator", icon: "mdi-square-edit-outline" },
      { text: "Profile Optimization", icon: "mdi-account-circle-outline" },
      { text: "Settings", icon: "mdi-cog-outline" },
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
