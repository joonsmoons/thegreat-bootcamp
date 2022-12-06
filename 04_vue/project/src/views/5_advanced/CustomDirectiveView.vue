<template>
  <div>
    <div>
      <label for="email" class="form-label">이메일주소</label>
      <input type="email" class="form-control" id="email" v-focus />
    </div>
    <div>
      <label for="pw" class="form-label">비밀번호</label>
      <input type="password" class="form-control" id="pw" />
    </div>
    <div>
      <button class="btn btn-primary">로그인</button>
    </div>
    <div v-color="color" style="height: 50px"></div>
    <div v-demo="{ color: 'red', text: 'hello!' }"></div>
    <div>
      <input type="text" v-lowercase class="form-control" />
    </div>
    <div>
      <input type="text" v-uppercase class="form-control" />
    </div>
    <div>
      <input type="text" v-number class="form-control" />
    </div>
    <div>
      <input type="text" v-korean class="form-control" />
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  directives: {
    // focus: {
    //   mounted(el, binding) {
    //     el.focus()
    //   }
    // },
    // lowercase: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       event.target.value = event.target.value.toLowerCase()
    //     })
    //   }
    // },
    // uppercase: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       event.target.value = event.target.value.toUpperCase()
    //     })
    //   }
    // },
    // number: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       event.target.value = event.target.value.replace(/[^0-9]/g, '')
    //     })
    //   }
    // },
    // korean: {
    //   mounted(el) {
    //     el.addEventListener('input', (event) => {
    //       event.target.value = event.target.value.replace(
    //         /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g,
    //         ''
    //       )
    //     })
    //   }
    // },
    color: {
      mounted(el, binding) {
        el.style.backgroundColor = binding.value
      }
    },
    demo: {
      mounted(el, binding) {
        el.innerText = binding.value.text
        el.style.color = binding.value.color
      }
    }
  },
  data() {
    return {
      color: 'red'
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
