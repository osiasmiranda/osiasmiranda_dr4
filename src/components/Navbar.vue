<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="../assets/logoInfnet.png" width="" />
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <a
          v-for="link in links"
          :key="link.title"
          class="navbar-item"
          @click="$router.push(link.url)"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["links"],
  created() {
    console.log(this.links);
  }
};
</script>
<style scoped>
a.navbar-item {
  text-transform: capitalize;
}
</style>
