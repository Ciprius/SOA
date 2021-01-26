<template>
  <div>
    <CarList :userName="userName"/>
  </div>
</template>

<script>
import CarList from '@/components/CarList';
export default {
  name: 'Cars',
  components: {
    CarList,
  },
  data() {
    return {
      userName: '',
    }
  },
  created() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      this.$router.push({ path: "/" });
    }
    this.userName = userName;
  },
};
</script>

<style scoped>

</style>