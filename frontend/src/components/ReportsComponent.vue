<template>
  <v-container>
    <v-row>
      <!-- Task Status Overview Chart -->
      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">Tasks Status Overview</h6>
            <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
          </div>
        </div>
      </v-col>

      <!-- Monthly Earnings Overview Chart -->
      <v-col cols="12" xl="6" lg="6" md="6" sm="6" xs="6">
        <div class="card">
          <div class="card-body">
            <h6 class="total-customers">Monthly Earnings Overview</h6>
            <apexchart
              type="area"
              :options="earningsChartOptions"
              :series="earningsChartSeries"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "@/services/supabaseClient";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      userId: null,

      // Task Status Chart Data
      chartSeries: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: ["To Do", "Doing", "Review", "Done"],
        },
        colors: ["#08090a", "#08090a", "#08090a", "#08090a"],
      },

      // Monthly Earnings Chart Data
      earningsChartSeries: [],
      earningsChartOptions: {
        chart: {
          type: "area",
          height: 350,
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [], // Dynamically populated months
          title: {
            text: "Month",
          },
          labels: {
            rotate: -45, // Rotate labels for better readability
            formatter: (value) => {
              const [year, month] = value.split("-");
              const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
            },
          },
        },
        yaxis: {
          title: {
            text: "Earnings ($)",
          },
        },
        tooltip: {
          enabled: true,
          x: {
            formatter: (value) => {
              const [year, month] = value.split("-");
              const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];
              return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
            },
          },
        },
        title: {
          text: "Monthly Earnings Overview",
          align: "center",
        },
        colors: ["#34a853"],
      },
    };
  },
  methods: {
    async fetchTaskData() {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("task_status")
          .eq("user_id", this.userId);

        if (error) {
          console.error("Error fetching tasks:", error);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("No tasks found.");
          this.chartSeries = [
            {
              name: "Tasks",
              data: [0, 0, 0, 0],
            },
          ];
          return;
        }

        const statuses = ["to do", "doing", "review", "done"];
        const counts = statuses.map((status) => {
          return data.filter((task) => task.task_status === status).length;
        });

        this.chartSeries = [
          {
            name: "Tasks",
            data: counts,
          },
        ];
      } catch (err) {
        console.error("Error:", err);
      }
    },

    async fetchEarningsData() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("start_date, billing_type, total_rate, estimated_hours, hourly_rate");

        if (error) {
          console.error("Error fetching project data:", error);
          return;
        }

        console.log("Fetched Data:", data); // Debugging

        if (!data || data.length === 0) {
          console.warn("No project data found.");
          this.earningsChartSeries = [
            {
              name: "Earnings",
              data: [],
            },
          ];
          this.earningsChartOptions.xaxis.categories = [];
          return;
        }

        // Find the earliest project start date
        const earliestDate = new Date(
          Math.min(...data.map((project) => new Date(project.start_date).getTime()))
        );
        const currentDate = new Date();

        console.log("Earliest Date:", earliestDate); // Debugging

        // Generate all months from earliest date to current month
        const months = [];
        let date = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
        while (date <= currentDate) {
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          months.push(monthYear);
          date.setMonth(date.getMonth() + 1); // Move to the next month
        }

        console.log("All Months:", months); // Debugging

        // Calculate earnings for each month
        const monthlyEarnings = {};

        data.forEach((project) => {
          const startDate = new Date(project.start_date);
          const monthYear = `${startDate.getFullYear()}-${String(
            startDate.getMonth() + 1
          ).padStart(2, "0")}`;

          let earnings = 0;
          if (project.billing_type === "Fixed") {
            earnings = project.total_rate || 0;
          } else if (project.billing_type === "Hourly") {
            earnings = (project.estimated_hours || 0) * (project.hourly_rate || 0);
          }

          if (!monthlyEarnings[monthYear]) {
            monthlyEarnings[monthYear] = 0;
          }
          monthlyEarnings[monthYear] += earnings;
        });

        console.log("Monthly Earnings (before filling):", monthlyEarnings); // Debugging

        // Fill in missing months with zero earnings
        const earningsData = months.map((month) => monthlyEarnings[month] || 0);

        console.log("Final Chart Data:", { months, earningsData }); // Debugging

        this.earningsChartOptions.xaxis.categories = months; // Set x-axis categories
        this.earningsChartSeries = [
          {
            name: "Earnings",
            data: earningsData,
          },
        ];
      } catch (err) {
        console.error("Error:", err);
      }
    },
  },

  async mounted() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      this.userId = user.id;
    }
    this.fetchTaskData();
    this.fetchEarningsData();
  },
};
</script>

<style scoped></style>
