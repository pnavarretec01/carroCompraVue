<template>
  <div>
    <div class="sidebar">
      <h4 class="nav-link disabled" href="#">Categorías</h4>

      <a class="categoriaNav" @click="productoCategoria()">Todas</a>
      <a
        class="categoriaNav"
        v-for="(categoria, index) in categorias"
        :key="index"
        @click="productoCategoria(categoria)"
        >{{ categoria.name }}</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: [],
    };
  },
  methods: {
    productoCategoria(categoria) {
      this.$emit("categoriaSeleccionada", categoria);
    },
    obtenerCategorias() {
      axios
        .get("http://sva.talana.com:8000/api/product-category/")
        .then((res) => {
          this.categorias = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.obtenerCategorias();
  },
};
</script>