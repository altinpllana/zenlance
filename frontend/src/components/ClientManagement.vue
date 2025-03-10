<template>
  <v-container class="mt-2">
    <v-row justify="center">
      <v-col cols="12" align="end">
        <v-btn color="primary" @click="openAddClientModal">Add New Client</v-btn>

        <div class="card mt-4">
          <div class="card-body">
            <v-data-table show-select :headers="headers" :items="clients">
              <template v-slot:[`item.id`]="{ item }">
                <p class="text-start">
                  {{ item.id }}
                </p>
              </template>
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
              <template v-slot:[`item.status`]="{ item }">
                <p class="text-start" v-if="item.status == false">Inactive</p>

                <p class="text-start" v-if="item.status == true">Active</p>
              </template>
              <template v-slot:[`item.created_at`]="{ item }">
                <p class="text-start">{{ item.created_at }}</p>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  variant="text"
                  class="mr-2"
                  color="blue"
                  icon
                  small
                  @click="openEditClientModal(item)"
                  ><v-icon>mdi-square-edit-outline</v-icon></v-btn
                >
                <v-btn
                  variant="text"
                  color="red"
                  icon
                  small
                  @click="confirmDeleteClient(item)"
                  ><v-icon>mdi-delete-outline</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </div>
        </div>

        <v-dialog v-model="showConfirmDeleteModal" max-width="500px">
          <v-card>
            <v-card-title>Confirm Delete</v-card-title>
            <v-card-text> Are you sure you want to delete this password? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="showConfirmDeleteModal = false"
                >Cancel</v-btn
              >
              <v-btn text color="green" @click="removeClient()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="showAddClientModal" max-width="500px">
          <v-card>
            <v-card-title>Add New Client</v-card-title>
            <v-card-text>
              <v-text-field
                variant="solo"
                v-model="newClient.client_name"
                label="Client Name"
                required
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newClient.email"
                label="Email"
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newClient.phone"
                label="Phone"
              ></v-text-field>

              <v-text-field
                variant="solo"
                v-model="newClient.country"
                label="Country"
              ></v-text-field>
              <v-label>Active Client</v-label>
              <v-switch color="primary" inset v-model="newClient.status"></v-switch>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="CloseAddClientModal">Cancel</v-btn>
              <v-btn v-if="isEditing != true" text color="green" @click="saveClient"
                >Save</v-btn
              >
              <v-btn v-if="isEditing == true" text color="green" @click="updateClient"
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
        { title: "Name", value: "client_name", align: "start" },
        { title: "Email", value: "email", align: "start" },
        { title: "Phone", value: "phone", align: "start" },
        { title: "Country", value: "country", align: "start" },
        { title: "Status", value: "status", align: "start" },
        { title: "Date Created", value: "created_at" },
        {
          title: "Actions",
          value: "actions",
          align: "end",
          sortable: false,
          width: "200px",
        },
      ],
      clients: [],
      showAddClientModal: false,
      showConfirmDeleteModal: false,
      newClient: { client_name: "", email: "", phone: "", country: "", status: false },
      isEditing: false,
      userId: null,
      clientToDelete: null,
      clientId: null,
    };
  },

  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchClients();
    }
  },
  methods: {
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
    openAddClientModal() {
      this.isEditing = false;
      this.newClient = {
        client_name: "",
        email: "",
        phone: "",
        country: "",
        status: false,
      };
      this.showAddClientModal = true;
    },
    openEditClientModal(item) {
      this.isEditing = true;
      this.clientId = item.id;
      this.newClient = { ...item };
      this.showAddClientModal = true;
    },
    CloseAddClientModal() {
      this.showAddClientModal = false;
    },

    CloseEditClientModal() {
      this.showAddClientModal = false;
    },

    async updateClient() {
      const { error } = await supabase
        .from("clients")
        .update({
          client_name: this.newClient.client_name,
          email: this.newClient.email,
          phone: this.newClient.phone,
          country: this.newClient.country,
          status: this.newClient.status,
          user_id: this.userId,
        })
        .eq("id", this.clientId)
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error updating password:", error);
      } else {
        this.CloseEditClientModal();
        this.fetchClients();
      }
    },

    async saveClient() {
      const { data, error } = await supabase.from("clients").insert([
        {
          client_name: this.newClient.client_name,
          email: this.newClient.email,
          phone: this.newClient.phone,
          country: this.newClient.country,
          status: this.newClient.status,
          user_id: this.userId,
        },
      ]);

      if (error) {
        console.error("Error saving password:", error);
      } else {
        this.CloseAddClientModal();
        this.fetchClients();
      }
    },
    confirmDeleteClient(item) {
      this.clientToDelete = item;
      this.showConfirmDeleteModal = true;
    },

    async removeClient() {
      if (this.clientToDelete) {
        const { error } = await supabase
          .from("clients")
          .delete()
          .eq("id", this.clientToDelete.id)
          .eq("user_id", this.userId);

        if (error) {
          console.error("Error deleting password:", error);
        } else {
          this.showConfirmDeleteModal = false;
          this.fetchClients();
        }
      }
    },
  },
};
</script>

<style scoped></style>
