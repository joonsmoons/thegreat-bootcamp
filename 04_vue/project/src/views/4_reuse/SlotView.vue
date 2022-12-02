<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#userModal"
    >
      Show Modal
    </button>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#userModal2"
    >
      Show Modal2
    </button>
    <SlotModal modalId="userModal">
      <template v-slot:title>모달창 타이틀</template>
      <template v-slot:body>
        <div class="row gy-2">
          <div class="col-3">
            <label for="" class="form-label">이메일주소</label>
          </div>
          <div class="col-9">
            <input type="email" name="" id="" />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="" class="form-label">전화번호</label>
          </div>
          <div class="col-9">
            <input type="tel" name="" id="" />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="" class="form-label">주소</label>
          </div>
          <div class="col-9">
            <input type="text" name="" id="" />
          </div>
        </div>
      </template>
      <template v-slot:footer
        ><button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" class="btn btn-primary">
          Understood
        </button></template
      >
    </SlotModal>
    <SlotModal modalId="userModal2">
      <template v-slot:title>모달창 타이틀2</template>
      <template v-slot:body>
        <div class="row gy-2">
          <div class="col-6">
            <label for="" class="form-label">이메일주소2</label>
          </div>
          <div class="col-6">
            <input type="email" name="" id="" />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <label for="" class="form-label">전화번호</label>
          </div>
          <div class="col-6">
            <input type="tel" name="" id="" />
          </div>
        </div>
      </template>
      <template v-slot:footer
        ><button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" class="btn btn-primary">
          Understood
        </button></template
      >
    </SlotModal>
  </div>
</template>
<script>
import SlotModal from '@/components/fragment/SlotModal.vue'
export default {
  components: { SlotModal },
  data() {
    return {
      sampleData: '',
      modalId: 'modals'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
