<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div class="card">
          <div class="card-body">
            <v-card-title>Change Profile</v-card-title>
            <v-card-subtitle> Change your profile picture from here </v-card-subtitle>
            <v-card-text class="text-center">
              <v-avatar size="100">
                <img src="https://via.placeholder.com/100" alt="Profile Picture" />
              </v-avatar>
              <p class="text-caption mt-3">Allowed JPG, GIF, or PNG. Max size of 800K</p>
            </v-card-text>
          </div>
        </div>
      </v-col>

      <!-- Change Password -->
      <v-col cols="12" md="6">
        <div class="card">
          <div class="card-body">
            <v-card-title>Change Password</v-card-title>
            <v-card-subtitle>
              To change your password, please confirm here
            </v-card-subtitle>
            <v-card-text>
              <v-text-field
                label="Current Password"
                type="password"
                variant="solo"
                dense
              ></v-text-field>
              <v-text-field
                label="New Password"
                type="password"
                variant="solo"
                dense
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                type="password"
                variant="solo"
                dense
              ></v-text-field>
            </v-card-text>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Personal Details -->
    <v-row>
      <v-col cols="12">
        <div class="card">
          <div class="card-body">
            <v-card-title>Personal Details</v-card-title>
            <v-card-subtitle>
              To change your personal details, edit and save from here
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Your Name" variant="solo" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Store Name" variant="solo" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Location"
                    :items="['United States', 'India', 'Canada']"
                    variant="solo"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Currency"
                    :items="['US Dollar ($)', 'Euro (€)', 'INR (₹)']"
                    variant="solo"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Email" variant="solo" dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Phone" variant="solo" dense></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Address" variant="solo" dense></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" class="text-right">
        <v-btn color="primary" class="mr-2">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
