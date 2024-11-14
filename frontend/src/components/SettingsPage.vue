<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <div class="card">
          <div class="card-body">
            <v-row>
              <v-col cols="12">
                <v-list>
                  <v-list-item
                    prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
                    subtitle="john@google.com"
                    title="John Leider"
                  >
                  </v-list-item>
                </v-list>

                <v-row class="mt-4">
                  <v-col cols="6">
                    <v-text-field variant="solo" label="Username"></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field variant="solo" label="Full Name"></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field variant="solo" label="Email"></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      type="password"
                      variant="solo"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col> </v-row
  ></v-container>
</template>
