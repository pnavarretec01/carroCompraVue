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
    /*
    Funcion encargada de mostrar u ocultar el carrito de compras
    */
    cambioCarro() {
      if (this.mostrarCarro) {
        this.mostrarCarro = false;
      } else {
        this.mostrarCarro = true;
      }
    },
    /*
    Funcion encargada de quitar un item del carrito de compras
    */
    quitarItem(index) {
      this.mostrarCarro = false;
      this.carroCantidad--;
      this.carro.splice(index, 1);
      this.totalCarro = this.suma();
      setTimeout(() => {
        this.mostrarCarro = true;
      }, 1);
    },
    /*
    Funcion encargada de cambiar la cantidad de un item específico
    */
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
    /*
    Funcion encargada de agregar items al div del carro
    validando si es que existe ya o no en dicho objeto,
    si ya existe, solo se incremente el numero de item 
    y se suma al total
    */
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
    /*
    Funcion encargada de realizar el filtro del campo
    de búsqueda
    */
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
    /*
    Funcion encargada de realizar el filtro de productos
    por categoria para listarlos al presionar en el sidebar
    */
    filtrarCategoria(categoria) {
      this.productos = this.productosAll;
      if (categoria != undefined) {
        this.productos = this.productos.filter(
          (o) => o.category.id == categoria.id
        );
      }
    },
    listarProductos() {
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
    this.listarProductos();
  },
};
</script>

<style lang="scss">
</style>
