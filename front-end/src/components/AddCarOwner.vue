<template>
  <div class="addCar">
    <form>
      <md-card class="md-layout-item md-size-25 md-small-size-50">
        <md-card-header>
          <div class="md-title">Add car for user {{ userName }}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="password">Brand</label>
                <md-input name="brand" id="brand" v-model="brand" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="model">Model</label>
                <md-input name="model" id="model" v-model="model" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="torque">Torque</label>
                <md-input name="torque" id="torque" type="number" v-model="torque" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="engine">Engine e.g. V8,V6...</label>
                <md-input name="engine" id="engine" v-model="engine" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="engineCapacity">Engine capacity</label>
                <md-input name="engineCapacity" id="engineCapacity" type="number" v-model="engineCapacity" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="horsePower">Horse power</label>
                <md-input name="horsePower" id="horsePower" type="number" v-model="horsePower" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="manufactureYear">Manufacture year</label>
                <md-input name="manufactureYear" id="manufactureYear" type="number" v-model="manufactureYear" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="weight">Weight in Kg</label>
                <md-input name="weight" id="weight" v-model="weight" type="number" :disabled="sending" />
              </md-field>
            </div>
            
            <div class="md-layout-item md-small-size-50">
              <md-field>
                <label for="spectedFor">Spected for</label>
                <md-input name="spectedFor" id="spectedFor" v-model="spectedFor" :disabled="sending" />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button class="md-raised md-primary" :disabled="sending" @click="addCar">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            Add car
          </md-button>
          <md-button class="md-raised md-primary" :disabled="sending" @click="goBack">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
            Back
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
import carSerive from '../service/car-service';
export default {
  name: 'AddCarOwner',
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      brand: '',
      model: '',
      torque: '',
      engine: '',
      engineCapacity: '',
      horsePower: '',
      manufactureYear: '',
      weight: '',
      spectedFor: '',
      sending: false,
      message: '',
      showSnackbar: false,
      duration: 4000,
      position: 'center',
    };
  },
  methods: {
    clearForm() {
      this.userName = '';
        this.torque = '';
        this.brand = '';
        this.model = '';
        this.engine = '';
        this.engineCapacity = '';
        this.weight = '';
        this.horsePower = '';
        this.spectedFor = '';
        this.manufactureYear = '';
    },
    addCar() {
      const carInfo = {
        ownerName: this.userName,
        torque: this.torque,
        brand: this.brand,
        model: this.model,
        engine: this.engine,
        engineCapacity: this.engineCapacity,
        weight: this.weight,
        horsePower: this.horsePower,
        spectedFor: this.spectedFor,
        manufactureYear: this.manufactureYear,
      }
      if (!carInfo.torque 
          || !carInfo.brand 
          || !carInfo.model 
          || !carInfo.engine 
          || !carInfo.engineCapacity
          || !carInfo.weight
          || !carInfo.horsePower
          || !carInfo.spectedFor
          || !carInfo.manufactureYear) {
        this.showSnackbar = true;
        this.message = 'All fields are mandatory to add a car.';
        return;
      }

      this.sending = true;
      carSerive.addCar(carInfo).then(response => {
        if (response.status) {
          this.$router.push({path: "/cars/" + this.userName});
        } else {
          this.showSnackbar = true;
          this.message = 'Could not add the car, please try again.';
        }
      }).catch(error => {
        console.log(error);
        this.showSnackbar = true;
        this.message = 'Could not add the car, please try again.';
      }).finally(() => {
        this.clearForm();
        this.sending = false;
      });
    },
    goBack() {
      this.$router.push({path: "/cars/" + this.userName});
    }
  }
};
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
.addCar {
  width: 100%;
  height: 100vh;
  padding-top: 50px;
  background-image: url("../assets/AddCar.jpg");
  background-size: cover;
}
</style>