<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex justify-center align-center text-center">
      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10">
        <h3>Start winning jobs</h3>
        <v-row class="mt-5 mb-5">
          <v-col cols="4">
            <div class="card">
              <div class="card-body">
                <div class="icon text-start mb-3">
                  <v-icon class="text-muted">mdi-comment-question-outline</v-icon>
                </div>
                <div class="text text-start">How to win jobs on upwork?</div>
              </div>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="card">
              <div class="card-body">
                <div class="icon text-start mb-3">
                  <v-icon class="text-muted">mdi-comment-question-outline</v-icon>
                </div>
                <div class="text text-start">How to win jobs on upwork?</div>
              </div>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="card">
              <div class="card-body">
                <div class="icon text-start mb-3">
                  <v-icon class="text-muted">mdi-comment-question-outline</v-icon>
                </div>
                <div class="text text-start">How to win jobs on upwork?</div>
              </div>
            </div>
          </v-col>

          <v-col cols="12">
            <p class="text">65% more chances to win the job.</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10" class="d-flex align-center">
        <v-text-field variant="solo" label="Job Description">
          <template v-slot:append>
            <v-btn color="primary" icon>
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>