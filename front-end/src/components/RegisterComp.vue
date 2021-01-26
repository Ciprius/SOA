<template>
  <div class="register">
    <form>
      <md-card class="md-layout-item md-size-25 md-small-size-50">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>
  
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="user-name">User Name</label>
                <md-input name="user-name" id="user-name" v-model="userName" :disabled="sending" />
              </md-field>
            </div>
  
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" type="password" v-model="password" :disabled="sending" />
              </md-field>
            </div>
          </div>
        </md-card-content>
  
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
  
        <md-card-actions>
          <md-button class="md-raised md-primary" :disabled="sending" @click="goBack">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
            Back
          </md-button>
          <md-button class="md-raised md-primary" :disabled="sending" @click="register">
            <font-awesome-icon icon="user-plus"></font-awesome-icon>
            Register
          </md-button>
        </md-card-actions>
      </md-card>
  
      <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
        <span>{{ message }}</span>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import userService from '../service/user-service';
export default {
  name: 'Register_Comp',
  data: () => ({
    userName: null,
    password: null,
    sending: false,
    position: 'center',
    message: '',
    showSnackbar: false,
    duration: 4000,
  }),
  methods: {
    clearForm() {
      this.userName = null;
      this.password = null;
    },
    register() {
      if (!this.password || !this.userName) {
        this.showSnackbar = true;
        this.message = 'User name and/or password must not be empty.';
        return;
      }
      
      let thisComp = this;
      this.sending = true;
      userService.addUser(this.userName,this.password)
        .then(response => {
          if (response.status == 201){
            this.$router.push({path: "/"});
          } else {
            thisComp.showSnackbar = true;
            thisComp.message = 'User already exists.';
          }
        })
        .catch(error => {
          console.log(error);
          thisComp.showSnackbar = true;
          thisComp.message = 'User already exists or there is a problem.';
        })
        .finally(() => {
          this.clearForm();
          thisComp.sending = false;
        });
    },
    goBack() {
      this.$router.push({path: "/"});
    }
  }
}

</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card {
  margin: 0 auto;
}
.md-layout{
  flex-wrap: unset;
  display: unset;
}
.register {
  width: 100%;
  height: 100vh;
  padding-top: 200px;
  background-image: url("../assets/Register_photo.jpg");
  background-size: cover;
}
</style>