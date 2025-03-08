<template>
  <v-container>
    <!-- Task List Section -->
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
        <div class="d-flex justify-space-between">
          <v-col cols="6">
            <h4 class="task-name">{{ selectedTask.task_name }}</h4>
          </v-col>

          <v-col cols="6">
            <v-btn
              variant="text"
              color="red"
              icon
              small
              @click="deleteTask(selectedTask.id)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn
              variant="text"
              color="primary"
              icon
              small
              @click="openEditTaskModal(selectedTask)"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-col>
        </div>
        <div class="task-status">
          Status <span class="ml-2 badge bg-primary">{{ selectedTask.task_status }}</span>
        </div>

        <div class="task-status mt-3">
          Priority
          <span v-if="selectedTask.priority == 'Low'" class="ml-2 badge bg-green">{{
            selectedTask.priority
          }}</span>

          <span
            v-if="selectedTask.priority == 'normal'"
            class="ml-2 badge bg-blue text-white"
            >{{ selectedTask.priority }}</span
          >

          <span
            v-if="selectedTask.priority == 'high'"
            class="ml-2 badge bg-orange text-white"
            >{{ selectedTask.priority }}</span
          >

          <span
            v-if="selectedTask.priority == 'urgent'"
            class="ml-2 badge bg-red text-white"
            >{{ selectedTask.priority }}</span
          >
        </div>

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

    <!-- Add Task Modal -->
    <v-dialog v-model="showAddTaskModal" max-width="500px">
      <v-card>
        <v-card-title>Add New Task</v-card-title>
        <v-card-text>
          <v-text-field
            label="Task Name"
            variant="solo"
            v-model="newTask.task_name"
            required
          ></v-text-field>
          <v-textarea
            variant="solo"
            label="Task Description"
            v-model="newTask.task_description"
            required
          ></v-textarea>

          <v-row>
            <v-col cols="6">
              <v-select
                variant="solo"
                label="Select Status"
                v-model="newTask.task_status"
                :items="statusOptions"
                required
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-select
                variant="solo"
                label="Priority"
                v-model="newTask.priority"
                :items="priorityOptions"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-switch
                inset
                color="green"
                v-model="isRelatedToClient"
                label="Related to Client?"
              ></v-switch>
            </v-col>

            <v-col cols="6">
              <v-select
                variant="solo"
                :label="isRelatedToClient ? 'Select Client' : 'Select Project'"
                v-model="newTask.relatedEntity"
                :items="isRelatedToClient ? clientOptions : projectOptions"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="closeAddTaskModal">Cancel</v-btn>
          <v-btn text color="green" @click="addTask">Add Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Task Modal -->
    <v-dialog v-model="showEditTaskModal" max-width="500px">
      <v-card>
        <v-card-title>Edit Task</v-card-title>
        <v-card-text>
          <v-text-field
            label="Task Name"
            variant="solo"
            v-model="editTask.task_name"
            required
          ></v-text-field>
          <v-textarea
            variant="solo"
            label="Task Description"
            v-model="editTask.task_description"
            required
          ></v-textarea>

          <v-row>
            <v-col cols="6">
              <v-select
                variant="solo"
                label="Select Status"
                v-model="editTask.task_status"
                :items="statusOptions"
                required
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-select
                variant="solo"
                label="Priority"
                v-model="editTask.priority"
                :items="priorityOptions"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-switch
                inset
                color="green"
                v-model="editTask.isRelatedToClient"
                label="Related to Client?"
              ></v-switch>
            </v-col>

            <v-col cols="6">
              <v-select
                variant="solo"
                :label="editTask.isRelatedToClient ? 'Select Client' : 'Select Project'"
                v-model="editTask.relatedEntity"
                :items="editTask.isRelatedToClient ? clientOptions : projectOptions"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="closeEditTaskModal">Cancel</v-btn>
          <v-btn text color="green" @click="saveTaskChanges">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for Success Messages -->
    <v-snackbar color="primary" v-model="snackbar.show" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";

export default {
  data() {
    return {
      showAddTaskModal: false,
      showEditTaskModal: false,
      isRelatedToClient: true, // Toggle state
      newTask: {
        task_name: "",
        task_description: "",
        task_status: "to do",
        priority: "Low",
      },
      editTask: {
        task_name: "",
        task_description: "",
        task_status: "to do",
        priority: "Low",
      },
      statusOptions: ["to do", "doing", "review", "done"],
      priorityOptions: ["Low", "Normal", "High", "Urgent"],
      userId: null,
      columns: {
        "To Do": [],
        Doing: [],
        Review: [],
        Done: [],
      },
      taskDetailsDrawer: false,
      selectedTask: null,
      clientOptions: [], // Dynamically fetched client options
      projectOptions: ["Project X", "Project Y", "Project Z"], // Sample project options
      snackbar: {
        show: false,
        text: "",
      },
    };
  },
  async created() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
      this.fetchTasks();
      this.fetchClients(); // Fetch clients from database
    }
  },
  methods: {
    async fetchClients() {
      const { data, error } = await supabase
        .from("clients")
        .select("id, client_name") // Adjust the fields to match your database
        .eq("user_id", this.userId); // Add any necessary filters

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        this.clientOptions = data;
      }
    },

    async showTaskDetails(id) {
      this.taskDetailsDrawer = true;
      this.selectedTask = null;

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

    deleteTask(id) {
      supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .then(() => {
          this.fetchTasks(); // Re-fetch tasks after deletion
          this.selectedTask = null;
          this.taskDetailsDrawer = false;
          this.snackbar.text = "Task deleted successfully!";
          this.snackbar.show = true; // Show the snackbar
        })
        .catch((err) => {
          console.error("Error deleting task:", err);
          this.snackbar.text = "Failed to delete task!";
          this.snackbar.show = true;
        });
    },

    openAddTaskModal(status) {
      this.newTask = {
        task_name: "",
        task_description: "",
        priority: "Low",
        task_status: status.toLowerCase(),
      };
      this.showAddTaskModal = true;
    },

    closeAddTaskModal() {
      this.showAddTaskModal = false;
    },

    openEditTaskModal(task) {
      this.editTask = { ...task }; // Set the task to be edited
      this.showEditTaskModal = true;
    },

    closeEditTaskModal() {
      this.showEditTaskModal = false;
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
        priority: this.newTask.priority,
      };

      const { data, error } = await supabase.from("tasks").insert([taskData]);

      if (error) {
        console.error("Error adding task:", error);
        this.snackbar.text = "Failed to add task!";
        this.snackbar.show = true;
      } else {
        const columnKey = this.getColumnKey(this.newTask.task_status);
        if (this.columns[columnKey]) {
          this.closeAddTaskModal();
          this.fetchTasks();
          this.columns[columnKey].push({
            ...taskData,
            id: data[0].id,
          });
          this.snackbar.text = "Task added successfully!";
          this.snackbar.show = true;
        }
      }
    },

    async saveTaskChanges() {
      if (!this.selectedTask) return;

      const taskData = {
        ...this.selectedTask,
        ...this.editTask,
      };

      const { data, error } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", this.selectedTask.id);

      if (error) {
        console.error("Error updating task:", error);
        this.snackbar.text = "Failed to update task!";
        this.snackbar.show = true;
      } else {
        this.selectedTask = data[0];
        this.closeEditTaskModal();
        this.snackbar.text = "Task updated successfully!";
        this.snackbar.show = true;
      }
    },
  },
};
</script>
