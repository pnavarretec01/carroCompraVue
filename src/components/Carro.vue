<template>
  <div class="carrito text-left" style="background: white">
    <button @click="cerrarCarro">x</button>
    <div class="container-fluid">
      <h5>Resumen de Compra</h5>
      <div v-for="(item, index) in carro" :key="index">
        {{ item.productoCarro.name }}
        <p>Precio: ${{ item.productoCarro.price }}</p>
        <input
          @change="cambioCantidad(cantidad[index], index)"
          v-model="cantidad[index]"
          class="card-link agregarNumero"
          type="number"
        />
        <p>Sub-total: ${{ item.productoCarro.price * cantidad[index] }}</p>
        <button @click="quitarItem(index)">x</button>
      </div>
      <p>{{ totalCarro }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carro: {
      type: Object,
      default() {
        return {};
      },
    },
    totalCarro: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      cantidad: [],
    };
  },
  methods: {
    cerrarCarro() {
      console.log(1);
      this.$emit("close");
    },
    quitarItem(index) {
      this.$emit("quitarItem", index);
    },
    cambioCantidad(cantidad, index) {
      this.$emit("cambioCantidad", cantidad, index);
    },
  },
  created() {
    this.carro.forEach((item, index) => {
      this.cantidad[index] = item.cantidadCarro;
    });
  },
};
</script>

<style>
</style>