<template>
  <div>
    <div>
      {{ userName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cars',
  data() {
    return {
      userName: '',
    }
  },
  created() {
    const userName = localStorage.getItem('userName');
    console.log(userName);
    if (!userName) {
      this.$router.push({ path: "/" });
    }
    this.userName = userName;
  },
};
</script>

<style scoped>

</style>