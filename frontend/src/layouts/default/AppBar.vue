<template>
  <v-app id="inspire">
    <template>
      <div class="text-center pa-4">
        <v-btn @click="dialog = true"> Open Dialog </v-btn>

        <v-dialog v-model="dialog" width="800">
          <v-card>
            <v-toolbar color="primary" title="Personal Details"></v-toolbar>
            <v-container>
              <v-row>
               
                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                  <v-text-field
                    variant="solo-filled"
                    label="Upwork Profile Name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <label>What is your badge?</label>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <div class="upwork-badge">
                    <img width="150" src="@/assets/rising-talent.png" alt="" />
                  </div>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <div class="upwork-badge">
                    <img width="150" src="@/assets/top-rated.png" alt="" />
                  </div>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <div class="upwork-badge">
                    <img width="150" src="@/assets/top-rated-plus.png" alt="" />
                  </div>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <div class="upwork-badge">
                    <img width="150" src="@/assets/expert-vetted.png" alt="" />
                  </div>
                </v-col>

                <v-col cols="12">
                  <label>What are your earnings on upwork till now?</label>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                  <div class="upwork-earnings">0$ - 5K$</div>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                  <div class="upwork-earnings">5K$ - 10K$</div>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                  <div class="upwork-earnings">+10K$</div>
                </v-col>
              </v-row>
            </v-container>
            <template v-slot:actions>
              <v-btn class="ms-auto" text="Save" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <v-app-bar class="px-3" density="compact" flat>
      <v-avatar class="hidden-md-and-up" color="grey-darken-1" size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs color="grey-darken-2" centered>
        <v-tab v-for="link in links" :key="link" :text="link"></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar class="hidden-sm-and-down" color="grey-darken-1" size="32"></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="8">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col cols="12" md="2">
            <v-sheet min-height="268" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],

    dialog: true,
    jobSuccessScore: 0,
  }),
};
</script>

<style scoped>
.upwork-badge {
  padding: 5px 5px;
  border: solid 1px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upwork-earnings {
  padding: 7px 20px;
  border: solid 1px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
