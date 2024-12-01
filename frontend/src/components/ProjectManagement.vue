<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" align="end">
        <v-btn color="primary" @click="openAddProjectModal">Add New Project</v-btn>

        <div class="card mt-4">
          <div class="card-body">
            <v-data-table show-select :headers="headers" :items="projects">
              <template v-slot:[`item.id`]="{ item }">
                <p class="text-start">{{ item.id }}</p>
              </template>

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

              <template v-slot:[`item.billing_type`]="{ item }">
                <p class="text-start">{{ item.billing_type }}</p>
              </template>

              <template v-slot:[`item.total_rate`]="{ item }">
                <p class="text-start">
                  {{
                    item.billing_type === "Hourly"
                      ? `$${(item.estimated_hours || 0) * (item.hourly_rate || 0)}`
                      : `$${item.total_rate || 0}`
                  }}
                </p>
              </template>

              <template v-slot:[`item.estimated_hours`]="{ item }">
                <p class="text-start">{{ item.estimated_hours }} hrs</p>
              </template>

              <template v-slot:[`item.hourly_rate`]="{ item }">
                <p class="text-start">${{ item.hourly_rate }}/hr</p>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  variant="text"
                  color="blue"
                  icon
                  small
                  @click="openEditProjectModal(item)"
                >
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-btn
                  variant="text"
                  color="red"
                  icon
                  small
                  @click="confirmDeleteProject(item)"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
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
            <v-card-title>Add New Project</v-card-title>
            <v-card-text>
              <!-- Project Name -->
              <v-text-field
                variant="solo"
                v-model="newProject.project_name"
                label="Project Name"
                required
              ></v-text-field>

              <!-- Client Selection -->
              <v-select
                :items="clients"
                v-model="newProject.client"
                label="Select Client"
                item-title="text"
                item-value="id"
                variant="solo"
              >
                <template #selection="{ item }">
                  <span> {{ item.props.title.client_name }}</span>
                </template>
                <template #item="{ item, props }">
                  <v-list-item v-bind="props">
                    <template #title>
                      <span>{{ item.props.title.client_name }}</span>
                    </template>
                  </v-list-item>
                </template>
              </v-select>

              <!-- Start Date -->
              <v-date-input
                v-model="newProject.start_date"
                label="Select Start Date"
                prepend-icon=""
                variant="solo"
              ></v-date-input>

              <v-date-input
                v-model="newProject.end_date"
                label="Select End Date"
                prepend-icon=""
                variant="solo"
              ></v-date-input>

              <v-text-field
                variant="solo"
                v-model="newProject.status"
                label="Status"
              ></v-text-field>

              <v-select
                :items="['Fixed', 'Hourly']"
                v-model="newProject.billing_type"
                label="Billing Type"
                variant="solo"
              ></v-select>

              <v-text-field
                v-if="newProject.billing_type === 'Fixed'"
                variant="solo"
                v-model="newProject.total_rate"
                label="Total Rate"
                type="number"
              ></v-text-field>

              <v-text-field
                v-if="newProject.billing_type === 'Hourly'"
                variant="solo"
                v-model="newProject.estimated_hours"
                label="Estimated Hours"
                type="number"
              ></v-text-field>

              <v-text-field
                v-if="newProject.billing_type === 'Hourly'"
                variant="solo"
                v-model="newProject.hourly_rate"
                label="Hourly Rate"
                type="number"
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
        { title: "ID", value: "id", align: "start", width: "50" },
        { title: "Project Name", value: "project_name", align: "start" },
        { title: "Client", value: "client", align: "start" },
        { title: "Start Date", value: "start_date", align: "start" },
        { title: "Deadline", value: "end_date", align: "start" },
        { title: "Status", value: "status", align: "start" },
        { title: "Billing Type", value: "billing_type", align: "start" },
        { title: "Total Rate", value: "total_rate", align: "start" },
        { title: "Estimated Hours", value: "estimated_hours", align: "start" },
        { title: "Hourly Rate", value: "hourly_rate", align: "start" },
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
        client: null,
        billing_type: "",
        status: "",
        total_rate: null,
        estimated_hours: "",
        hourly_rate: "",
        start_date: null,
        end_date: null,
        description: "test",
      },
      isEditing: false,
      userId: null,
      projectToDelete: null,
      projectId: null,
      clients: [],
    };
  },

  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchProjects();
      this.fetchClients();
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
        this.projects = data;
      }
    },

    async fetchClients() {
      const { data, error } = await supabase
        .from("clients")
        .select("id, client_name") // Adjust the fields to match your database
        .eq("user_id", this.userId); // Add any necessary filters

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        this.clients = data;
        // for (let $i = 0; data.length > 0; $i++) {
        //   this.clients.push({
        //     text: data[$i].client_name,
        //     value: data[$i].id,
        //   });

        //   console.log(this.clients);
        // }
      }
    },

    openAddProjectModal() {
      this.isEditing = false;
      // this.newProject = {
      //   project_name: "",
      //   client: null,
      //   billing_type: "",
      //   status: "",
      //   total_rate: "",
      //   estimated_hours: "",
      //   hourly_rate: "",
      //   start_date: null,
      //   end_date: null,
      //   description: "",
      // };
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
