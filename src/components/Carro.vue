<template>
  <div class="carrito text-left" style="background: white">
    <div style="float: right">
      <button class="btn btn-secondary" @click="cerrarCarro">x</button>
    </div>
    <div class="container-fluid p-3">
      <h5>Resumen de Compra</h5>
      <div v-for="(item, index) in carro" :key="index">
        <strong>{{ item.productoCarro.name }}</strong>
        <div class="row">
          <div class="col-4">
            <p><strong>Precio:</strong>${{ item.productoCarro.price }}</p>
          </div>
          <div class="col-2">
            <input
              @change="cambioCantidad(cantidad[index], index)"
              pattern="^[0-9]"
              v-model="cantidad[index]"
              class="card-link agregarNumero"
              type="number"
            />
          </div>
          <div class="col-6">
            <div class="col-6 float-left">
              <p>
                <strong>Sub-total:</strong> ${{
                  item.productoCarro.price * cantidad[index]
                }}
              </p>
            </div>
            <div class="col-6 float-right">
              <button class="btn btn-danger" @click="quitarItem(index)">
                x
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row" v-if="totalCarro != 0">
        <div class="col-6"><strong>Total</strong></div>
        <div class="col-6">
          <p>${{ totalCarro }}</p>
        </div>
      </div>
      <h5 v-else><strong>Carro Vacío</strong></h5>
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
      this.$emit("close");
    },
    quitarItem(index) {
      this.$emit("quitarItem", index);
    },
    /*
    emite al componente padre la cantidad de items
    seleccionados en el input del div del carro
    */
    cambioCantidad(cantidad, index) {
      if (cantidad < 1) {
        cantidad = 1;
      }
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