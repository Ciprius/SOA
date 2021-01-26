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
                <p>{{ car.horsePower }} Hp</p>
              </div>
              <div id="Torque">
                <h4><font-awesome-icon icon="wrench"></font-awesome-icon> Torque:</h4>
                <p>{{ car.torque }} NM</p>
              </div>
            </md-card-content>
            
            <md-divider></md-divider>
            
            <md-card-content id="WeightContent">
              <h4><font-awesome-icon icon="weight-hanging"></font-awesome-icon> Weigth:</h4>
              <p>{{ car.weight }} Kg</p>
            </md-card-content>
            
            <md-divider></md-divider>
            
            <md-card-actions>
              <md-button :to="'/book/' + car.id ">
                <font-awesome-icon icon="pen"/> Edit
              </md-button>
              <md-button class="md-accent" @click="deleteCar(car.id)">
                <font-awesome-icon icon="trash"/> Delete
              </md-button>
            </md-card-actions>
            
            <md-card-expand>
              
              <md-card-actions md-alignment="space-between">
                <md-card-expand-trigger>
                  <md-button><font-awesome-icon icon="arrow-down"></font-awesome-icon> Expand</md-button>
                </md-card-expand-trigger>
              </md-card-actions>
              
              <md-card-expand-content>
                <md-card-content id="EngineContent">
                  <h4><font-awesome-icon icon="bong"></font-awesome-icon> Engine:</h4>
                  <p>{{ car['engine'] }}</p>
                  <h4><font-awesome-icon icon="warehouse"></font-awesome-icon> Engine capacity:</h4>
                  <p>{{ car.engineCapacity }} Liters</p>
                  <h4><font-awesome-icon icon="tachometer-alt"></font-awesome-icon> Spected for:</h4>
                  <p>{{ car.spectedFor }}</p>
                </md-card-content>
              </md-card-expand-content>
              
            </md-card-expand>
          </md-card-area>
        </md-card>
      </div>
      
      <div>
        <md-button class="md-fab md-plain">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </md-button>
      </div>
    </div>
    
    <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
      <span>{{ message }}</span>
    </md-snackbar>
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
    };
  },
  created() {
    this.userName = this.$route.params.owner;
    this.getCarsByOwner();
  },
  methods: {
    getCarsByOwner() {
      carSerive.getCarsByOwner(this.userName).then(cars => {
        this.$set(this, 'carList', cars.data);
        console.log(this.carList);
      });
    },
    deleteCar(id) {
      let cars = this.carList;
      const thisComp = this;
      carSerive.deleteCar(id).then(response => {
        if (response.status === 200) {
          cars = cars.filter((el) => el.id !== id);
          this.$set(this, 'carList', cars);
          thisComp.showSnackbar = true;
          thisComp.message = 'Car deleted successfully.';
        }
      });
    }
  }
};
</script>

<style scoped>
.md-card {
  width: 520px;
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
</style>