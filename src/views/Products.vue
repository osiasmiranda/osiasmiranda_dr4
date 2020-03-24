<template>
  <div class="columns">
    <div class="column is-three-fifths">
      <table v-if="data.length != 0" class="table">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              {{ column }}
            </th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index_row) in data" :key="index_row">
            <td v-for="(column, index) in columns" :key="index">
              {{ row[column] }}
            </td>
            <td>
              <p class="buttons">
                <a class="button is-small is-primary" @click="editProduct(row)"
                  >Editar</a
                >
                <a
                  class="button is-small is-danger"
                  @click="deleteProduct(row.id)"
                  >Excluir</a
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="notification is-danger">
        É uma pena !<strong> Não há nenhum livro para mostrar :(</strong>
      </div>
    </div>
    <div class="column">
      <a
        href="#"
        @click="addProduct()"
        class="button"
        style="float:right;margin-top:-20px"
        >Add Produto</a
      >
      <ProductInputForm :editId="editId"></ProductInputForm>
    </div>
  </div>
</template>

<script>
import ProductInputForm from "../components/ProductInputForm.vue";

export default {
  name: "Product",
  components: {
    ProductInputForm
  },
  data() {
    return {
      showAdd: true,
      editId: ""
    };
  },
  computed: {
    data() {
      console.log("baru", this.$store.state.products);
      return this.$store.state.products;
    },
    columns() {
      return this.$store.state.products.length > 0
        ? Object.keys(this.$store.state.products[0])
        : [];
    }
  },
  methods: {
    editProduct(product) {
      this.editId = product.id;
      this.showAdd = false;
    },
    addProduct() {
      this.editId = "";
      this.showAdd = true;
    },
    deleteProduct(product) {
      this.$swal({
        title: "Você tem certeza?",
        text: "Não será possível desfazer",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, delete!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("removeProduct", product).then(res => {
            if (res) this.$swal("Deletado!", " Registro Excluído .", "success");
            else this.$swal("Falhou!", "Falha ao apagar o registro.", "error");
          });
        }
      });
    }
  }
};
</script>
<style></style>
