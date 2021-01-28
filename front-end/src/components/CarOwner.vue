<template>
  <div id="AllCars">
    <md-tabs md-alignment="right">
      <md-tab id="tab-pages" md-label="My cars" :to="'/cars/'+userName"></md-tab>
      <md-tab id="tab-home" md-label="All cars" to="/cars"></md-tab>
      <md-tab id="tab-disabled" :md-label="'Welcome ' + userName" md-disabled></md-tab>
      <md-tab id="tab-posts" md-label="Log out" to="/"></md-tab>
    </md-tabs>
    <div id="CarsContainer">
      <div id="CarsContent">
        <md-card
            v-for="(car,index) in this.carList"
            md-with-hover
            :key="index">
          
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ car.ownerName }}</div>
              <div class="md-subhead">Manufacture: {{ car.brand }}, Model: {{ car.model }}, Year: {{ car.manufactureYear }}</div>
            </md-card-header-text>
          </md-card-header>
          
          <md-card-area>
            <md-card-content id="EngineNRContent">
              <div id="HP">
                <h4><font-awesome-icon icon="horse"></font-awesome-icon> Power:</h4>
                <input 
                  :value="car.horsePower" 
                  :class="getClasses(index)" 
                  v-if="isEdit[index]"
                  @input="power = $event.target.value"
                  type="number"/>
                <p v-else-if="!isEdit[index]">{{ car.horsePower }} Hp</p>
              </div>
              <div id="Torque">
                <h4>
                  <font-awesome-icon icon="wrench"></font-awesome-icon> 
                  Torque:
                </h4>
                <input 
                  :value="car.torque" 
                  :class="getClasses(index)" 
                  v-if="isEdit[index]"
                  @input="torque = $event.target.value"
                  type="number"/>
                <p v-else-if="!isEdit[index]">{{ car.torque }} NM</p>
              </div>
            </md-card-content>
            
            <md-divider></md-divider>
            
            <md-card-content id="WeightContent">
              <h4>
                <font-awesome-icon icon="weight-hanging"></font-awesome-icon> 
                Weigth:
              </h4>
              <input 
                :value="car.weight" 
                :class="getClasses(index)" 
                v-if="isEdit[index]"
                @input="weight = $event.target.value"
                type="number"/>
              <p v-else-if="!isEdit[index]">{{ car.weight }} Kg</p>
            </md-card-content>
            
            <md-divider></md-divider>
            
            <md-card-actions>
              <div v-if="!isEdit[index]">
                <md-button :disabled="isDisabled[index]" @click="toggleEdit(true, index)">
                  <font-awesome-icon icon="pen"/> Edit
                </md-button>
                <md-button :disabled="isDisabled[index]" class="md-accent" @click="deleteCar(car.id)">
                  <font-awesome-icon icon="trash"/> Delete
                </md-button>
              </div>
              <div v-else-if="isEdit[index]">
                <md-button class="md-primary" @click="updateCarInfo(index, car)">
                  <font-awesome-icon icon="save"/> Save
                </md-button>
                <md-button class="md-accent" @click="toggleEdit(false, index)">
                  <font-awesome-icon icon="ban"/> Cancel
                </md-button>
              </div>
            </md-card-actions>
            
            <md-card-expand>
              
              <md-card-actions md-alignment="space-between">
                <md-card-expand-trigger>
                  <md-button><font-awesome-icon icon="arrow-down"></font-awesome-icon> Expand</md-button>
                </md-card-expand-trigger>
              </md-card-actions>
              
              <md-card-expand-content>
                <md-card-content id="EngineContent">
                  <div class="div-engine">
                    <h4>
                      <font-awesome-icon icon="bong"></font-awesome-icon> 
                      Engine:
                    </h4>
                    <input 
                      :value="car['engine']" 
                      :class="getClasses(index)" 
                      class="engine" 
                      v-if="isEdit[index]"
                      @input="engine = $event.target.value"/>
                    <p v-else-if="!isEdit[index]">{{ car['engine'] }}</p>
                  </div>
                  <div class="div-engine">
                    <h4>
                      <font-awesome-icon icon="warehouse"></font-awesome-icon> 
                      Engine capacity:
                    </h4>
                    <input 
                      :value="car.engineCapacity" 
                      :class="getClasses(index)" 
                      class="engine" 
                      v-if="isEdit[index]"
                      @input="capacity = $event.target.value"
                      type="number"/> 
                    <p v-else-if="!isEdit[index]">{{ car.engineCapacity }} Liters</p>
                  </div>
                  <div>
                    <h4>
                      <font-awesome-icon icon="tachometer-alt"></font-awesome-icon> 
                      Spected for:
                    </h4>
                    <input 
                      :value="car.spectedFor" 
                      :class="getClasses(index)" 
                      class="spec" 
                      v-if="isEdit[index]"
                      @input="spec = $event.target.value"/>
                    <p v-else-if="!isEdit[index]">{{ car.spectedFor }}</p>
                  </div>
                </md-card-content>
              </md-card-expand-content>
              
            </md-card-expand>
          </md-card-area>
        </md-card>
      </div>
      
      <div>
        <md-button class="md-fab md-plain" :to="'/add/'+ userName">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </md-button>
      </div>
    </div>
    
    <md-snackbar :md-position="position" :md-duration="isInfinity? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ message }}</span>
    </md-snackbar>
    
    <div id='spinner' v-if="sending">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import carSerive from '../service/car-service';
export default {
  name: 'CarOwner',
  data() {
    return {
      carList: [],
      userName: '',
      showSnackbar: false,
      duration: 4000,
      message: '',
      position: 'center',
      isInfinity: false,
      isEdit: [],
      isDisabled: [],
      power: '',
      torque: '',
      weight: '',
      engine: '',
      capacity: '',
      spec: '',
      sending: false,
    };
  },
  created() {
    this.userName = this.$route.params.owner;
    this.isInfinity = false;
    this.getCarsByOwner();
  },
  methods: {
    getClasses(index) {
      const classes = [{'primary': true}];
      classes.push({'not-edit': !this.isEdit[index]});

      return classes;
    },
    getCarsByOwner() {
      const thisComp = this;
      this.sending = true;
      carSerive.getCarsByOwner(this.userName).then(cars => {
        this.$set(this, 'carList', cars.data);
        thisComp.isEdit.length = cars.data.length;
        thisComp.isEdit.fill(false, 0);
        thisComp.isDisabled.length = cars.data.length;
        thisComp.isDisabled.fill(false, 0);
        console.log(this.carList);
      }).catch(error => {
        if (String(error).indexOf('403') > -1) {
          thisComp.showSnackbar = true;
          thisComp.isInfinity = true;
          thisComp.message = 'The token session expired. Log in again.';
        } else {
          thisComp.showSnackbar = true;
          thisComp.isInfinity = true;
          thisComp.message = 'You do not have any car. Try to add using that red button on the right';
        }
      }).finally(() => {
        this.sending = false;
      });
    },
    deleteCar(id) {
      let cars = this.carList;
      const thisComp = this;
      this.sending = true;
      carSerive.deleteCar(id).then(response => {
        if (response.status === 200) {
          cars = cars.filter((el) => el.id !== id);
          this.$set(this, 'carList', cars);
          thisComp.showSnackbar = true;
          thisComp.message = 'Car deleted successfully.';
        } else {
          thisComp.showSnackbar = true;
          thisComp.message = 'Could not delete the car. Please try again';
        }
      }).catch(error => {
        console.log(error);
        thisComp.showSnackbar = true;
        thisComp.message = 'Could not delete the car.';
      }).finally(() => {
        this.sending = false;
      });
    },
    toggleEdit(value, index) {
      this.isDisabled.fill(value,0);
      this.isDisabled.splice(index, 1, false);
      
      this.isEdit.splice(index, 1, value);
    },
    updateCarInfo(index, car) {
      const thisComp = this;
      const carListCopy = this.carList;
      const {id, ...carInfo} = car;
      this.sending = true;
      carInfo.horsePower = parseInt(this.power) || carInfo.horsePower;
      carInfo.torque = parseInt(this.torque) || carInfo.torque;
      carInfo.weight = parseInt(this.weight) || carInfo.weight;
      carInfo.engine = this.engine || carInfo.engine;
      carInfo.engineCapacity = parseInt(this.capacity) || carInfo.engineCapacity;
      carInfo.spectedFor = this.spec || carInfo.spectedFor;
      
      carSerive.updateCar(id, carInfo).then(updatedCar => {
        if (updatedCar.status === 200) {
          carListCopy[index] = updatedCar.data;
          this.$set(this, 'carList', carListCopy);
          thisComp.toggleEdit(false, index);
  
          thisComp.showSnackbar = true;
          thisComp.message = 'Car updated successfully.';
        } else {
          thisComp.showSnackbar = true;
          thisComp.message = 'Could not update the car. Please try again';
        }
      }).catch(error => {
        console.log(error);
        thisComp.showSnackbar = true;
        thisComp.message = 'Could not update the car.';
      }).finally(() => {
        this.sending = false;
      });
    }
  }
};
</script>

<style scoped>
.primary {
  height: 25px;
  margin: auto 0;
  margin-right: 8px;
  width: 60px;
}
.primary.engine {
  width: 45px;
}
.primary.spec {
  width: 60px; 
}
.div-engine {
  margin-right: 8px;
}
.primary.not-edit {
  border: none;
  margin-right: 0;
  color: black;
  background-color: white;
}
.md-card {
  width: 620px;
  margin: 0 auto 10px;
  vertical-align: top;
}
.md-card-content div {
  display: flex;
}
.md-card-content {
  display: flex;
  padding-top: 0;
  padding-bottom: 0;
}
p {
  align-self: center;
}
#Torque {
  margin-left: 30px;
}
h4{
  margin-right: 8px;
}
#EngineContent p {
  margin-right: 16px;
}
#tab-disabled {
  border: 1px solid gray;
}
#AllCars {
  background: url("../assets/My-Cars.jpg") no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
#CarsContainer {
  height: 95vh;
  overflow: auto;
  padding-top: 10px;
}
.md-fab {
  position: absolute;
  bottom: 40px;
  right: 60px;
}
.md-progress-spinner {
  margin: 24px;
}
</style>