<template>
  <v-container>

    <!-- Kanban Board Columns -->
    <v-row class="mt-4">
      <v-col cols="3" v-for="(tasks, status) in columns" :key="status">
        <div class="card kanban">
          <div class="card-body">
            <h5 class="task-status text-uppercase">{{ status }}</h5>
            <div class="card mt-5" v-for="task in tasks" :key="task.id">
              <div class="card-body">
                <h6 class="task-name">{{ task.name }}</h6>
                <v-icon v-if="task.description != null">mdi-text</v-icon>
              </div>
            </div>

            <div class="button-holder mt-4 d-grid">
              <v-btn variant="text" color="primary"  @click="openAddTaskModal"><v-icon>mdi-plus</v-icon>Add Task</v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Add Task Modal -->
    <v-dialog v-model="showAddTaskModal" max-width="500px">
      <v-card>
        <v-card-title>Add New Task</v-card-title>
        <v-card-text>
          <v-text-field label="Task Name" v-model="newTask.name" required></v-text-field>
          <v-textarea
            label="Description"
            v-model="newTask.description"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="closeAddTaskModal">Cancel</v-btn>
          <v-btn text color="green" @click="addTask">Add Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showAddTaskModal: false,
      newTask: {
        name: "",
        description: "",
      },
      // Kanban board columns
      columns: {
        "To Do": [],
        Doing: [],
        Review: [],
        Done: [],
      },
    };
  },
  methods: {
    openAddTaskModal() {
      this.showAddTaskModal = true;
      this.newTask = { name: "", description: "" }; // Reset form
    },
    closeAddTaskModal() {
      this.showAddTaskModal = false;
    },
    addTask() {
      if (this.newTask.name && this.newTask.description) {
        // Add the new task to the "To Do" column
        this.columns["To Do"].push({
          id: Date.now(), // Unique ID for each task
          name: this.newTask.name,
          description: this.newTask.description,
        });
        this.closeAddTaskModal(); // Close the modal after adding
      }
    },
  },
};
</script>

<style scoped>
/* Optional styling */
.v-card-title {
  font-weight: bold;
  text-align: center;
}
.v-card {
  min-height: 300px;
}

.kanban{
    height: 80vh;
}
</style>
