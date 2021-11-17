<template>
  <div v-if="cargado">
    <BarraNav
      @filtro="filtroInput"
      @cambioCarro="cambioCarro"
      :cantidadItem="carroCantidad"
    />
    <sideBar @categoriaSeleccionada="filtrarCategoria" />
    <div class="content container-flex">
      <div class="row">
        <div
          class="col-6 col-md-3 mt-2"
          v-for="(producto, index) in productos"
          :key="index"
        >
          <Producto :datos="producto" @agregarProducto="agregarProducto" />
        </div>
        <ModalAgregarProducto
          v-if="showModal"
          :datos="productoSeleccionado"
          :cantidad="cantidad"
          @close="showModal = false"
          @agregarCarro="agregarCarro"
        ></ModalAgregarProducto>
        <Carro
          @close="mostrarCarro = false"
          :carro="carro"
          :totalCarro="totalCarro"
          v-if="mostrarCarro"
          @cambioCantidad="cambioCantidad"
          @quitarItem="quitarItem"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BarraNav from "./components/BarraNav.vue";
import Producto from "./components/Producto.vue";
import sideBar from "./components/sideBar.vue";
import ModalAgregarProducto from "./components/ModalAgregarProducto";
import Carro from "./components/Carro";
import "../public/styles.css";
import "../public/styles.scss";

export default {
  components: {
    BarraNav,
    sideBar,
    Producto,
    ModalAgregarProducto,
    Carro,
  },
  data() {
    return {
      totalCarro: 0,
      mostrarCarro: false,
      carro: [],
      carroCantidad: 0,
      showModal: false,
      cantidad: "",
      productoSeleccionado: [],
      cargado: false,
      productos: [],
      productosAll: [],
    };
  },
  methods: {
    cambioCarro() {
      if (this.mostrarCarro) {
        this.mostrarCarro = false;
      } else {
        this.mostrarCarro = true;
      }
    },
    quitarItem(index) {
      this.mostrarCarro = false;
      this.carroCantidad--;
      this.carro.splice(index, 1);
      this.totalCarro = this.suma();
      setTimeout(() => {
        this.mostrarCarro = true;
      }, 1);
    },
    cambioCantidad(cantidad, index) {
      this.mostrarCarro = false;
      this.carro[index].cantidadCarro = cantidad;
      this.totalCarro = this.suma();
      setTimeout(() => {
        this.mostrarCarro = true;
      }, 1);
    },
    suma() {
      let sumatotal = 0;
      this.carro.forEach((item) => {
        sumatotal += item.productoCarro.price * item.cantidadCarro;
      });
      return sumatotal;
    },
    agregarCarro(producto, cantidad) {
      this.mostrarCarro = false;
      this.showModal = false;
      let existe = false;
      let item = {
        productoCarro: producto,
        cantidadCarro: cantidad,
      };
      this.carro.forEach((item) => {
        if (item.productoCarro.id == producto.id) {
          item.cantidadCarro += cantidad;
          existe = true;
        }
      });
      if (!existe) {
        this.carro.push(item);
        this.carroCantidad++;
      }
      this.totalCarro = this.suma();
      setTimeout(() => {
        this.mostrarCarro = true;
      }, 1);
    },
    agregarProducto(producto, cantidad) {
      this.cantidad = cantidad;
      this.productoSeleccionado = producto;
      this.showModal = true;
    },
    filtroInput(filtro) {
      this.productos = this.productosAll;
      if (filtro != "") {
        this.productos = this.productos.filter(
          (o) =>
            o.name.toLowerCase().includes(filtro.toLowerCase()) ||
            o.category.name.toLowerCase() == filtro.toLowerCase()
        );
      }
    },
    filtrarCategoria(categoria) {
      this.productos = this.productosAll;
      if (categoria != undefined) {
        this.productos = this.productos.filter(
          (o) => o.category.id == categoria.id
        );
      }
    },
    listarProdcutos() {
      axios
        .get("http://sva.talana.com:8000/api/product/")
        .then((res) => {
          this.productos = res.data;
          this.productosAll = res.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.cargado = true));
    },
  },
  created() {
    this.listarProdcutos();
  },
};
</script>

<style lang="scss">
</style>
