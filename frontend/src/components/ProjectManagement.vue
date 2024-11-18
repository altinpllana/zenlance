<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" align="end">
        <v-btn color="primary" @click="openAddProjectModal">Add New Project</v-btn>

        <div class="card mt-4">
          <div class="card-body">
            <v-data-table :headers="headers" :items="projects">
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
              <template v-slot:[`item.status`]="{ item }">
                <p class="text-start">{{ item.status }}</p>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn class="mr-2" icon small @click="openEditProjectModal(item)"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn icon small @click="confirmDeleteProject(item)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </div>
        </div>

        <v-dialog v-model="showConfirmDeleteModal" max-width="500px">
          <v-card>
            <v-card-title>Confirm Delete</v-card-title>
            <v-card-text> Are you sure you want to delete this project? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="showConfirmDeleteModal = false"
                >Cancel</v-btn
              >
              <v-btn text color="green" @click="removeProject()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showAddProjectModal" max-width="500px">
          <v-card>
            <v-card-title>Add New Client</v-card-title>
            <v-card-text>
              <v-text-field
                variant="solo"
                v-model="newProject.project_name"
                label="Project Name"
                required
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newProject.client"
                label="Client"
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newProject.phone"
                label="Phone"
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newProject.country"
                label="Country"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="CloseAddProjectModal">Cancel</v-btn>
              <v-btn v-if="isEditing != true" text color="green" @click="saveProject"
                >Save</v-btn
              >
              <v-btn v-if="isEditing == true" text color="green" @click="updateProject"
                >Update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";

export default {
  data() {
    return {
      headers: [
        { title: "Project Name", value: "project_name", align: "start" },
        { title: "Client", value: "client", align: "start" },
        { title: "Start Date", value: "start_date", align: "start" },
        { title: "Deadline", value: "end_date", align: "start" },
        { title: "Status", value: "status", align: "start" },
        {
          title: "Actions",
          value: "actions",
          align: "end",
          sortable: false,
          width: "200px",
        },
      ],
      projects: [],
      showAddProjectModal: false,
      showConfirmDeleteModal: false,
      newProject: {
        project_name: "",
        client: "",
        billing_type: "",
        status: "",
        total_rate: "",
        estimated_hours: "",
        hourly_rate: "",
        start_date: "",
        end_date: "",
        description: "",
      },
      isEditing: false,
      userId: null,
      projectToDelete: null,
      projectId: null,
    };
  },

  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchProjects();
    }
  },
  methods: {
    async fetchProjects() {
      if (!this.userId) return;

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        this.clients = data;
      }
    },
    openAddProjectModal() {
      this.isEditing = false;
      this.newProject = {
        project_name: "",
        client: "",
        billing_type: "",
        status: "",
        total_rate: "",
        estimated_hours: "",
        hourly_rate: "",
        start_date: "",
        end_date: "",
        description: "",
      };
      this.showAddProjectModal = true;
    },
    openEditProjectModal(item) {
      this.isEditing = true;
      this.projectId = item.id;
      this.newProject = { ...item };
      this.showAddProjectModal = true;
    },
    CloseAddProjectModal() {
      this.showAddProjectModal = false;
    },

    CloseEditProjectModal() {
      this.showAddProjectModal = false;
    },

    async updateProject() {
      const { error } = await supabase
        .from("projects")
        .update({
          project_name: this.newProject.project_name,
          client: this.newProject.client,
          billing_type: this.newProject.billing_type,
          status: this.newProject.status,
          total_rate: this.newProject.total_rate,
          estimated_hours: this.newProject.estimated_hours,
          hourly_rate: this.newProject.hourly_rate,
          start_date: this.newProject.start_date,
          end_date: this.newProject.end_date,
          description: this.newProject.description,
          user_id: this.userId,
        })
        .eq("id", this.projectId)
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error updating password:", error);
      } else {
        this.CloseEditProjectModal();
        this.fetchProjects();
      }
    },

    async saveProject() {
      const { data, error } = await supabase.from("projects").insert([
        {
          project_name: this.newProject.project_name,
          client: this.newProject.client,
          billing_type: this.newProject.billing_type,
          status: this.newProject.status,
          total_rate: this.newProject.total_rate,
          estimated_hours: this.newProject.estimated_hours,
          hourly_rate: this.newProject.hourly_rate,
          start_date: this.newProject.start_date,
          end_date: this.newProject.end_date,
          description: this.newProject.description,
          user_id: this.userId,
        },
      ]);

      if (error) {
        console.error("Error saving password:", error);
      } else {
        this.CloseAddProjectModal();
        this.fetchProjects();
      }
    },
    confirmDeleteProject(item) {
      this.projectToDelete = item;
      this.showConfirmDeleteModal = true;
    },

    async removeProject() {
      if (this.projectToDelete) {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", this.projectToDelete.id)
          .eq("user_id", this.userId);

        if (error) {
          console.error("Error deleting password:", error);
        } else {
          this.showConfirmDeleteModal = false;
          this.fetchProjects();
        }
      }
    },
  },
};
</script>

<style scoped></style>
