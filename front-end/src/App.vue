<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
};
</script>

<style>
#nav {
  display: none;
}
.md-theme-default {
  overflow: hidden;
}
</style>
