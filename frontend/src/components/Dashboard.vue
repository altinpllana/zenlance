<template>
  <v-container>
    <div class="welcome-div pt-5 pb-5 mb-5">
      <h3>Wednesday, July 3rd</h3>
      <h1>Good afternoon, Altin.</h1>
    </div>

    <v-row>
      <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
        <v-card class="card project-timeline mb-5">
          <v-card-title>Overview</v-card-title>
        </v-card>

        <v-card class="card income-expenses mb-5">
          <v-card-title>Income & Expenses</v-card-title>
          <div>
            <apexchart
              type="area"
              height="400"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card class="card pa-5">
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card class="card quick-actions-card pa-5">
                <div class="icon-holder text-center">
                  <v-icon large color="primary"> mdi-square-edit-outline </v-icon>
                </div>
                <v-card-title class="text-center">Generate Proposal</v-card-title>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card class="card quick-actions-card pa-5">
                <div class="icon-holder text-center">
                  <v-icon large color="primary"> mdi-currency-usd </v-icon>
                </div>
                <v-card-title class="text-center">Create Invoice</v-card-title>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card class="card quick-actions-card pa-5">
                <div class="icon-holder text-center">
                  <v-icon large color="primary"> mdi-account-circle-outline </v-icon>
                </div>
                <v-card-title class="text-center">Optimize Profile</v-card-title>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card class="card quick-actions-card pa-5">
                <div class="icon-holder text-center">
                  <v-icon large color="primary"> mdi-folder-multiple-outline </v-icon>
                </div>
                <v-card-title class="text-center">Create Project</v-card-title>
              </v-card>
            </v-col></v-row
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
</script>

<style scoped>
.welcome-div {
  border-bottom: solid 1px #f0f0f0 !important;
}

.quick-actions-card:hover {
  border-color: #3572ef !important;
  /* border-color: red !important; */
}
</style>
