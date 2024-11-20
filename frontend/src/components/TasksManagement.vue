<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="3" v-for="(tasks, status) in columns" :key="status">
        <div class="card kanban">
          <div class="card-body">
            <h5 class="task-status text-uppercase">{{ status }}</h5>
            <div
              @click.stop="showTaskDetails(task.id)"
              class="card single-task mt-5"
              v-for="task in tasks"
              :key="task.id"
            >
              <div class="card-body">
                <h6 class="task-name">{{ task.task_name }}</h6>
                <v-icon v-if="task.task_description != null">mdi-text</v-icon>
              </div>
            </div>
            <div class="button-holder mt-4 d-grid">
              <v-btn variant="text" color="primary" @click="openAddTaskModal(status)">
                <v-icon>mdi-plus</v-icon>Add Task
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Task Details Drawer -->
    <v-navigation-drawer
      v-model="taskDetailsDrawer"
      temporary
      location="right"
      width="700"
    >
      <v-container v-if="selectedTask">
        <h4 class="task-name">{{ selectedTask.task_name }}</h4>
        <span class="task-status">
          Status <span class="ml-2 badge bg-primary">{{ selectedTask.task_status }}</span>
        </span>
        <div class="task-description mt-4">
          <v-textarea
            variant="solo"
            label="Description"
            v-model="selectedTask.task_description"
            readonly
          ></v-textarea>
        </div>
      </v-container>
      <v-container v-else>
        <p>Loading task details...</p>
      </v-container>
    </v-navigation-drawer>

    <v-dialog v-model="showAddTaskModal" max-width="500px">
      <v-card>
        <v-card-title>Add New Task</v-card-title>
        <v-card-text>
          <v-text-field
            label="Task Name"
            v-model="newTask.task_name"
            required
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="newTask.task_description"
            required
          ></v-textarea>

          <v-select
            label="Select Status"
            v-model="newTask.task_status"
            :items="statusOptions"
            required
          ></v-select>
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
import { supabase } from "@/services/supabaseClient";

export default {
  data() {
    return {
      showAddTaskModal: false,
      newTask: {
        task_name: "",
        task_description: "",
        task_status: "to do",
      },
      statusOptions: ["to do", "doing", "review", "done"],
      userId: null,
      columns: {
        "To Do": [],
        Doing: [],
        Review: [],
        Done: [],
      },
      taskDetailsDrawer: false,
      selectedTask: null, // To hold the selected task details
    };
  },
  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchTasks();
    }
  },
  methods: {
    getColumnKey(status) {
      switch (status.toLowerCase()) {
        case "to do":
          return "To Do";
        case "doing":
          return "Doing";
        case "review":
          return "Review";
        case "done":
          return "Done";
        default:
          return "To Do";
      }
    },

    async showTaskDetails(id) {
      this.taskDetailsDrawer = true;
      this.selectedTask = null; // Clear previous task details

      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching task details:", error);
        } else {
          this.selectedTask = data;
        }
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async fetchTasks() {
      if (!this.userId) {
        console.log("User ID is not set");
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", this.userId);

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        console.log("Fetched Tasks:", data);

        if (data.length > 0) {
          this.columns = {
            "To Do": data.filter((task) => task.task_status === "to do"),
            Doing: data.filter((task) => task.task_status === "doing"),
            Review: data.filter((task) => task.task_status === "review"),
            Done: data.filter((task) => task.task_status === "done"),
          };
        }
      }
    },
    openAddTaskModal(status) {
      this.newTask = {
        task_name: "",
        task_description: "",
        task_status: status.toLowerCase(),
      };
      this.showAddTaskModal = true;
    },
    closeAddTaskModal() {
      this.showAddTaskModal = false;
    },
    async addTask() {
      if (!this.userId) {
        alert("User ID is not set. Cannot add task without a valid user.");
        return;
      }

      const taskData = {
        user_id: this.userId,
        task_name: this.newTask.task_name,
        task_description: this.newTask.task_description,
        task_status: this.newTask.task_status,
      };

      const { data, error } = await supabase.from("tasks").insert([taskData]);

      if (error) {
        console.error("Error adding task:", error);
      } else {
        const columnKey = this.getColumnKey(this.newTask.task_status);
        if (this.columns[columnKey]) {
          this.columns[columnKey].push({
            ...taskData,
            id: data[0].id,
          });
        }
        this.closeAddTaskModal();
      }
    },
  },
};
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  text-align: center;
}
.v-card {
  min-height: 300px;
}
.kanban {
  height: 80vh;
}
</style>
