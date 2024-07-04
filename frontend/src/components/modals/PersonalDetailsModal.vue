<template>
  <v-dialog v-model="dialog" width="800" persistent>
    <v-card>
      <v-toolbar color="primary" title="Personal Details"></v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <v-text-field
              variant="solo"
              label="Upwork Profile Name"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label>What is your badge?</label>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3">
            <div
              class="upwork-badge"
              @click="handleClick(1)"
              :class="{ clicked: selected === 1 }"
            >
              <img width="150" src="@/assets/rising-talent.png" alt="" />
            </div>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3">
            <div
              class="upwork-badge"
              @click="handleClick(2)"
              :class="{ clicked: selected === 2 }"
            >
              <img width="150" src="@/assets/top-rated.png" alt="" />
            </div>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3">
            <div
              class="upwork-badge"
              @click="handleClick(3)"
              :class="{ clicked: selected === 3 }"
            >
              <img width="150" src="@/assets/top-rated-plus.png" alt="" />
            </div>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3">
            <div
              class="upwork-badge"
              @click="handleClick(4)"
              :class="{ clicked: selected === 4 }"
            >
              <img width="150" src="@/assets/expert-vetted.png" alt="" />
            </div>
          </v-col>

          <v-col cols="12">
            <label>What are your earnings on upwork till now?</label>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <div
              class="upwork-earnings"
              @click="selectEarningsRange(1)"
              :class="{ clicked: earningSelected === 1 }"
            >
              0$ - 5K$
            </div>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <div
              class="upwork-earnings"
              @click="selectEarningsRange(2)"
              :class="{ clicked: earningSelected === 2 }"
            >
              5K$ - 10K$
            </div>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4">
            <div
              class="upwork-earnings"
              @click="selectEarningsRange(3)"
              :class="{ clicked: earningSelected === 3 }"
            >
              +10K$
            </div>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          variant="flat"
          color="primary"
          text="Save"
          @click="saveDialog"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    earningSelected: null,
    dialog: true,
    jobSuccessScore: 0,
  }),

  methods: {
    saveDialog() {
      this.dialog = false;
      this.snackbar = true;
    },

    handleClick(index) {
      this.selected = index;
    },

    selectEarningsRange(index) {
      this.earningSelected = index;
    },
  },
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
  cursor: pointer;
}

.upwork-earnings {
  padding: 7px 20px;
  border: solid 1px #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.clicked {
  border: solid 1px #3572EF;
}
</style>
