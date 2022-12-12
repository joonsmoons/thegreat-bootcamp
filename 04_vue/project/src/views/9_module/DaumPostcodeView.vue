<template>
  <div class="row">
    <div class="col-lg-3 col-md-5">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="zoneCode"
          placeholder="우편번호"
          aria-label="우편번호"
          aria-describedby="postcode"
        />
        <button
          class="btn btn-outline-secondary"
          id="postcode"
          @click="openPostCode"
        >
          검색
        </button>
      </div>
    </div>
    <div class="col-12">
      <input
        type="text"
        class="form-control"
        placeholder="주소"
        v-model="roadAddress"
        readonly
      />
      <input type="text" class="form-control" placeholder="상세주소" />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      zoneCode: '',
      roadAddress: ''
    }
  },
  setup() {},
  created() {
    if (!window.daum) {
      this.loadScript()
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    loadScript() {
      const script = document.createElement('script')
      script.src =
        '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      document.head.appendChild(script)
    },
    openPostCode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          console.log(data)
          this.zoneCode = data.zonecode
          this.roadAddress = data.roadAddress
        }
      }).open()
    }
  }
}
</script>
