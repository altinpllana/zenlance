<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="3">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-account-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Clients</h3>
            <h1 class="total-customers-counter">{{ totalClients }}</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="3">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-text-box-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Generated Proposals</h3>
            <h1 class="total-customers-counter">0</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="3">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-folder-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Projects</h3>
            <h1 class="total-customers-counter">{{ totalProjects }}</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="3" lg="3" md="3" sm="3" xs="3">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-checkbox-multiple-marked-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Tasks</h3>
            <h1 class="total-customers-counter">{{ ongoingTasks }}</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-clients">Clients List</h6>
            <v-data-table
              hide-default-footer
              items-per-page="5"
              :headers="headersClients"
              :items="clients"
            >
              <template v-slot:[`item.client_name`]="{ item }">
                <p class="text-start">{{ item.client_name }}</p>
              </template>
              <template v-slot:[`item.email`]="{ item }">
                <p class="text-start">{{ item.email }}</p>
              </template>
              <template v-slot:[`item.phone`]="{ item }">
                <p class="text-start">{{ item.phone }}</p>
              </template>
              <template v-slot:[`item.country`]="{ item }">
                <p class="text-start">{{ item.country }}</p>
              </template>
              <template v-slot:[`item.created_at`]="{ item }">
                <p class="text-start">{{ item.created_at }}</p>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-projects">Projects List</h6>
            <v-data-table
              hide-default-footer
              items-per-page="5"
              :headers="headersProject"
              :items="projects"
            >
              <template v-slot:[`item.project_name`]="{ item }">
                <p class="text-start">{{ item.project_name }}</p>
              </template>
              <template v-slot:[`item.client`]="{ item }">
                <p class="text-start">{{ item.client }}</p>
              </template>
              <template v-slot:[`item.start_date`]="{ item }">
                <p class="text-start">{{ item.start_date }}</p>
              </template>
              <template v-slot:[`item.end_date`]="{ item }">
                <p class="text-start">{{ item.end_date }}</p>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">Calendar</h6>
            <v-sheet>
              <v-calendar color="primary"></v-calendar>
            </v-sheet>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">To Do</h6>

            <v-text-field
              v-model="newTask"
              label="Add a new task"
              @keyup.enter="addTask"
              variant="solo"
              clearable
            >
              <template v-slot:append>
                <v-btn color="primary" @click="addTask">Add Task</v-btn>
              </template>
            </v-text-field>

            <v-list>
              <v-list-item v-for="(task, index) in tasks" :key="index" class="mb-2">
                <v-list-item-content>
                  <v-list-item-title>{{ task }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="removeTask(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";

export default {
  name: "Dashboard",
  data() {
    return {
      headersProject: [
        { title: "Project Name", value: "project_name" },
        { title: "Client", value: "client" },
        { title: "Start Date", value: "start_date" },
        { title: "End Date", value: "end_date" },
      ],
      headersClients: [
        { title: "Name", value: "client_name", align: "start" },
        { title: "Email", value: "email", align: "start" },
        { title: "Phone", value: "phone", align: "start" },
        { title: "Country", value: "country", align: "start" },
      ],
      newTask: "",
      tasks: [],

      totalClients: 0,
      ongoingTasks: 0,
      totalProjects: 0,
      clients: [],
      projects: [],
    };
  },

  async mounted() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchTotalClients();
      this.fetchOngoingTasks();
      this.fetchClients();
      this.fetchTotalProjects();
      this.fetchProjects();
    }
  },

  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push(this.newTask);
        this.newTask = "";
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },

    async fetchClients() {
      if (!this.userId) return;

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        this.clients = data;
      }
    },

    async fetchProjects() {
      if (!this.userId) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        this.projects = data;
      }
    },

    async fetchTotalProjects() {
      try {
        const { count, error } = await supabase
          .from("projects")
          .select("*", { count: "exact" })
          .eq("user_id", this.userId);
        if (error) {
          console.error("Error fetching client count:", error);
        } else {
          this.totalProjects = count;
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },

    async fetchTotalClients() {
      try {
        const { count, error } = await supabase
          .from("clients")
          .select("*", { count: "exact" })
          .eq("user_id", this.userId);
        if (error) {
          console.error("Error fetching client count:", error);
        } else {
          this.totalClients = count;
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },

    async fetchOngoingTasks() {
      try {
        const { count, error } = await supabase
          .from("tasks")
          .select("*", { count: "exact" })
          .eq("user_id", this.userId);

        if (error) {
          console.error("Error fetching client count:", error);
        } else {
          this.ongoingTasks = count;
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    },
  },
};
</script>

<style scoped></style>
