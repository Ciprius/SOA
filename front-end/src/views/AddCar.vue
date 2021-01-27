<template>
  <div>
    <AddCarOwner :userName="userName"></AddCarOwner>
  </div>
</template>

<script>
import AddCarOwner from '@/components/AddCarOwner';
export default {
  name: 'AddCar',
  components: {
    AddCarOwner
  },
  data() {
    return {
      userName: '',
    };
  },
  created() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      this.$router.push({ path: "/" });
    }
    this.userName = userName;
  }
};
</script>

<style scoped>

</style>