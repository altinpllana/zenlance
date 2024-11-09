<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="4">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-account-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Customers</h3>
            <h1 class="total-customers-counter">0</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="4">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-text-box-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Proposal Generated</h3>
            <h1 class="total-customers-counter">0</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="4" lg="4" md="4" sm="4" xs="4">
        <div class="card">
          <div class="card-body">
            <div class="icon-box mt-1 mb-4">
              <v-icon color="#08090a">mdi-folder-multiple-outline</v-icon>
            </div>
            <h3 class="total-customers">Total Projects</h3>
            <h1 class="total-customers-counter">0</h1>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">Clients List</h6>
            <v-data-table
              :headers="headers.text"
              :items="clients"
              :items-per-page="5"
              :hide-default-header="true"
              :hide-default-footer="true"
            >
              <template v-slot:[`item.name`]="{ item }"> {{ item.name }} </template>
              <template v-slot:[`item.email`]="{ item }">
                {{ item.email }}
              </template>
              <template v-slot:[`item.price`]="{ item }"> ${{ item.price }} </template>
            </v-data-table>
          </div>
        </div>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">Projects List</h6>
            <v-data-table
              :headers="headers.text"
              :items="clients"
              :items-per-page="5"
              :hide-default-header="true"
              :hide-default-footer="true"
            >
              <template v-slot:[`item.name`]="{ item }"> {{ item.name }} </template>
              <template v-slot:[`item.email`]="{ item }">
                {{ item.email }}
              </template>
              <template v-slot:[`item.price`]="{ item }"> ${{ item.price }} </template>
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
export default {
  name: "Dashboard",
  data() {
    return {
      headers: [
        { text: "Project Name", value: "project-name" },
        { text: "Project", value: "project" },
        { text: "Price", value: "price" },
      ],
      clients: [
        { name: "John Doe", project: "johndoe@example.com", price: "450" },
        { name: "Jane Smith", project: "janesmith@example.com", price: "450" },
        { name: "Jane Smith", project: "janesmith@example.com", price: "450" },
      ],
      newTask: "",
      tasks: [],
    };
  },

  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push(this.newTask);
        this.newTask = ""; // Clear the input field
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
