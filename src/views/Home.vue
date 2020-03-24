<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Produtos</p>
        <p class="title">{{ data_product }} Cadastrado</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Home",
  computed: {
    data_product() {
      return this.$store.state.products.length;
    }
  }
};
</script>

<style></style>
