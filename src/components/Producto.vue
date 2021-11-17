<template>
  <div>
    <div class="card" style="width: 18rem" v-if="datos.length != 0">
      <img
        class="card-img-top imagenProducto"
        :src="datos.photo"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title nombre-producto">{{ datos.name }}</h5>
        <p class="card-text">
          $
          {{ datos.price }}
        </p>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-center">
          <input
            v-model="cantidad"
            class="card-link agregarNumero"
            type="number"
            style="float: left"
            @change="validaNegativo"
          />
          <button
            class="card-link boton-levanta-modal-carro"
            data-toggle="modal"
            data-target="#modalAgregarProducto"
            style="float: left"
            @click="agregarProductoCarro"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-cart-fill icono-carrito"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-else>asd</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    datos: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      cantidad: 1,
    };
  },
  methods: {
    validaNegativo() {
      if (this.cantidad < 1) {
        this.cantidad = 1;
      }
    },
    agregarProductoCarro() {
      this.$emit("agregarProducto", this.datos, this.cantidad);
      setTimeout(() => {
        this.cantidad = 1;
      }, 600);
    },
  },
};
</script>

<style>
</style>