<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex justify-center align-center text-center">
      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10">
        <h3>Start winning jobs</h3>
        <v-row class="mt-5 mb-5">
          <v-col cols="4" v-for="i in 3" :key="i">
            <div class="card">
              <div class="card-body">
                <div class="icon text-start mb-3">
                  <v-icon class="text-muted">mdi-comment-question-outline</v-icon>
                </div>
                <div class="text text-start">How to win jobs on Upwork?</div>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <p class="text">65% more chances to win the job.</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10" class="d-flex align-center">
        <v-text-field
          v-model="jobDescription"
          variant="solo"
          label="Job Description"
          @keydown.enter="submitJobDescription"
        >
          <template v-slot:append>
            <v-btn color="primary" icon @click="submitJobDescription">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10">
        <p v-if="apiResponse">Response: {{ apiResponse }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      jobDescription: "",
      apiResponse: null,
    };
  },
  methods: {
    async submitJobDescription() {
      if (!this.jobDescription) return;

      try {
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Replace with the model you wish to use
            prompt: this.jobDescription,
            max_tokens: 150, // Adjust as needed
          }),
        });

        const data = await response.json();
        this.apiResponse = data.choices[0]?.text || "No response from AI";
      } catch (error) {
        console.error("Error:", error);
        this.apiResponse = "Error: Could not fetch response";
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
