<template>
  <div class="log-in">
    <form>
      <md-card class="md-layout-item md-size-25 md-small-size-50">
        <md-card-header>
          <div class="md-title">Log in</div>
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
          <md-button class="md-raised md-primary" :disabled="sending" @click="logIn">
            <font-awesome-icon icon="sign-in-alt"></font-awesome-icon>
            Log In
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
  name: 'FormValidation',
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
    logIn() {
      if (!this.password || !this.userName) {
        this.showSnackbar = true;
        this.message = 'User name and/or password must not be empty.';
        return;
      }
      this.showSnackbar = !!this.showSnackbar;
      
      let thisComp = this;
      this.sending = true;
      userService.getLogin(this.userName, this.password)
        .then(data => {
          if (Array.isArray(data.data)) {
            const userInfo = data.data[0];
            localStorage.setItem("userName",userInfo.userName);
            localStorage.setItem("token",userInfo.token);
            thisComp.$router.push({ path:'/cars'});
          } else {
            thisComp.showSnackbar = true;
            thisComp.message = 'User name and/or password does not exist.';
          }
        }).catch(error => {
          console.log(error);
          thisComp.showSnackbar = true;
          thisComp.message = 'We encounter an error, try again later.';
        }).finally(() => {
          this.clearForm();
          thisComp.sending = false;
        });
    },
    register() {
      this.$router.push({ path:'/register' });  
    },
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
.log-in {
  width: 100%;
  height: 100vh;
  padding-top: 200px;
  background-image: url("../assets/carlo-d-agnolo-aFxSh_l4fbY-unsplash.jpg");
}
</style>