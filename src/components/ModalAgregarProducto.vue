<template>
  <div>
    <transition name="modal" class="modalProducto">
      <div
        class="modal fade"
        id="modalAgregarProducto"
        tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
        aria-labelledby="modalAgregarProductoLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarProductoLabel">
                Producto Agregado
              </h5>
              <button
                @click="$emit('close')"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <br />
              <div class="row">
                <div class="col-6">
                  <div class="card">
                    <img
                      class="card-img-top"
                      :src="datos.photo"
                      alt="Card image cap"
                    />
                  </div>
                </div>
                <div class="col-6 text-left">
                  <label><strong>Nombre:</strong> {{ datos.name }}</label>
                  <br />
                  <label><strong>Código: </strong>{{ datos.code }}</label>
                  <br />
                  <label><strong>Precio: </strong>${{ datos.price }}</label>
                  <br />
                  <label><strong>Cantidad:</strong></label> &nbsp;
                  <input
                    @change="validaPositivo"
                    class="agregarNumero"
                    v-model="cantidadItem"
                    type="number"
                  />
                  <br />
                  <label
                    ><strong>Sub-total:</strong> ${{
                      datos.price * cantidadItem
                    }}</label
                  >
                </div>
                <div class="col-12 text-justify mt-3">
                  {{ datos.description }}
                </div>
              </div>
              <br />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  @click="$emit('close')"
                >
                  Seguir Comprando
                </button>
                <button
                  class="btn btn-danger"
                  v-bind:data-dismiss="dismiss"
                  @click="$emit('agregarCarro', datos, cantidadItem)"
                >
                  Agregar al Carro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    cantidad: {
      type: Number,
      default() {
        return 1;
      },
    },
    datos: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      cantidadItem: 1,
      subtotal: "",
      dismiss: "modal",
    };
  },
  methods: {
    validaPositivo() {
      if (this.cantidadItem < 1) {
        this.cantidadItem = 1;
      }
    },
  },
  created() {
    this.cantidadItem = this.cantidad;
  },
};
</script>

<style>
</style>