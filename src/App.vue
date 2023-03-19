<template>
  <v-app>
    <Search/>
    <AppUpdateComponent/>
  </v-app>
</template>

<script>
import Search from "@/views/Search"
import AppUpdateComponent from "@/components/AppUpdateComponent.vue"

export default {
  name: "App",
  components: {
    Search,
    AppUpdateComponent
  }
}
</script>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
