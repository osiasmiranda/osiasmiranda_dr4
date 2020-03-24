<template>
  <div>
    <form @submit="submit($event)">
      <div class="field">
        <label class="label">{{ editAddText }} Nome do livro</label>
        <div class="control">
          <input
            class="input"
            v-model="product.Nome_do_livro"
            type="text"
            placeholder="Nome do Livro"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ editAddText }} Autor</label>
        <div class="control">
          <input
            class="input"
            v-model="product.Autor"
            type="text"
            placeholder="Autor"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">{{ editAddText }} Data da inclusão</label>
        <div class="control">
          <input class="input" v-model="currentDate" type="text" disabled />
        </div>
      </div>

      <div class="field-body">
        <div class="field is-narrow">
          <label class="label">{{ editAddText }} gênero</label>
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                v-model="product.genero"
                value="Motivacional"
              />
              Motivacional
            </label>
            <label class="radio">
              <input type="radio" v-model="product.genero" value="Ficção" />
              Ficção
            </label>
            <label class="radio">
              <input type="radio" v-model="product.genero" value="Terror" />
              Terror
            </label>
          </div>
        </div>
      </div>

      <div class="field is-grouped" style="margin-top:20px">
        <div class="control">
          <button class="button is-link">{{ editAddText }} Produto</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProductInputForm",
  props: ["editId"],
  data() {
    return {
      product: {
        Nome_do_livro: "",
        Autor: "",
        genero: ""
      }
    };
  },
  watch: {
    editId(val) {
      if (val) {
        let current = this.$store.state.products.filter(i => {
          if (i.id == val) return true;
          else false;
        })[0];

        this.product.Nome_do_livro = current.Nome_do_livro;
        this.product.Autor = current.Autor;
        this.product.genero = current.genero;
      } else {
        this.product = {
          Nome_do_livro: "",
          Autor: "",
          genero: ""
        };
      }
    }
  },
  computed: {
    currentDate() {
      return new Date().toString();
    },
    editAddText() {
      return this.editId ? "Editar" : "Inserir";
    }
  },
  methods: {
    submit(event) {
      event.preventDefault();
      var payload = this.product;
      payload["data_inclusao"] = this.currentDate;

      if (!this.editId) {
        payload["id"] =
          this.$store.state.products.length != 0
            ? Math.max(...this.$store.state.products.map(i => i.id)) + 1
            : 0;
        const product = { ...payload };
        this.$store.dispatch("addProduct", product);
      } else {
        payload["id"] = this.editId;
        const product = { ...payload };
        this.$store.dispatch("editProduct", product);
      }
    }
  }
};
</script>

<style></style>
