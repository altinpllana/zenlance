<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex justify-center align-center text-center">
      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10" v-if="!hasResponse">
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

      <!-- Chat Interface -->
      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10">
        <div class="chat-container">
          <div
            v-for="(message, index) in chatMessages"
            :key="index"
            class="chat-message"
            :class="{
              'user-message': message.role === 'user',
              'ai-message': message.role === 'ai',
            }"
          >
            <span v-html="message.content"></span>
          </div>

          <div id="chat-loading-container" v-if="isLoading">
            <div id="loading-bubble">
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Input Field -->
      <v-col cols="12" xl="8" lg="8" md="8" sm="10" xs="10" class="d-flex align-center">
        <v-textarea
          rows="1"
          v-model="jobDescription"
          variant="solo"
          label="Type your message"
          @keydown.enter="submitJobDescription"
        >
          <template v-slot:append>
            <v-btn color="primary" icon @click="submitJobDescription">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      jobDescription: "",
      chatMessages: [],
      hasResponse: false,
      isLoading: false,
    };
  },
  methods: {
    async submitJobDescription() {
      if (!this.jobDescription) {
        alert("Please enter a message.");
        return;
      }

      this.hasResponse = true;
      this.isLoading = true;

      // Add user's message to the chat
      this.chatMessages.push({ role: "user", content: this.jobDescription });

      const userInput = this.jobDescription; // Save input before resetting
      this.jobDescription = ""; // Clear input field3

      const API_KEY = "glhf_e1673ab072840b074981068d0ea9706a"; // Store securely in production

      try {
        const response = await fetch("https://glhf.chat/api/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: userInput },
            ],
            model: "hf:mistralai/Mistral-7B-Instruct-v0.3",
          }),
        });

        const result = await response.json();
        const plainTextResponse =
          result.choices && result.choices.length > 0
            ? result.choices[0].message.content
            : "No response from the AI.";

        // Format the plain text response into HTML
        const formattedResponse = this.formatToHtml(plainTextResponse);

        // Add AI's response (formatted HTML) to the chat
        this.chatMessages.push({ role: "ai", content: formattedResponse });

        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching AI response:", error);
        this.chatMessages.push({
          role: "ai",
          content: this.formatToHtml("An error occurred while processing your request."),
        });
      }
    },

    formatToHtml(text) {
      // Convert plain text to HTML
      let html = text
        .split("\n") // Split text by newlines
        .map((line) => {
          // Format bullet points
          if (line.startsWith("-") || line.startsWith("*")) {
            return `<li>${line.substring(1).trim()}</li>`;
          }
          // Return as paragraph
          return `<p>${line}</p>`;
        })
        .join("");

      // Wrap bullet points in <ul> if they exist
      if (html.includes("<li>")) {
        html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");
      }

      // Convert URLs into clickable links
      html = html.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      return html;
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-message {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  max-width: 70%;
}

.user-message {
  background-color: #08090a;
  align-self: flex-end;
  text-align: right;
  color: #fff;
}

.ai-message {
  background-color: #f1f1f1;
  align-self: flex-start;
  text-align: left;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 45px;
  height: 9px;
  margin-left: -22px;
  margin-top: -13px;
  text-align: center;
}
.spinner > div {
  width: 9px;
  height: 9px;
  background-color: #dcdcdc;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1400ms ease-in-out infinite;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
#chat-loading-container {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  display: -ms-flexbox;
}

#loading-bubble {
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  width: auto;
  height: auto;
  min-width: 73px;
  min-height: 40px;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  background-color: #000;
  -webkit-animation: message-bounce 2.5s infinite ease-in-out;
  animation: message-bounce 2.5s ease-in-out infinite;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

#loading-bubble:before {
  display: block;
  content: " ";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 8px 0;
  border-color: transparent #000 transparent transparent;
  position: absolute;
  left: -7px;
  top: 13px;
}
#loading-bubble .spinner {
  position: static !important;
  margin-top: -11px;
  margin-left: 0px;
}
</style>
