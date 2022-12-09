<template>
  <div>
    {{ email }}, {{ nickName }}, {{ gender }}
    <div id="naverIdLogin">
      <a id="naverIdLogin_loginButton" href="#" role="button"
        ><img src="https://static.nid.naver.com/oauth/big_g.PNG" width="320"
      /></a>
    </div>
    <button class="btn btn-danger" @click="naverLogout($event)">
      로그아웃
    </button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      email: '',
      nickName: '',
      gender: '',
      naverLogin: null
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'tvJVvv09Rg99sQPNYeVh',
      callbackUrl: 'http://localhost:8080/login/naver',
      isPopup: true,
      loginButton: { color: 'green', type: 3, height: 60 }
    })
    /* (4) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
    this.naverLogin.init()

    /* (5) 현재 로그인 상태를 확인 */
    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        // /* (6) 로그인 상태가 "true" 인 경우 로그인 버튼을 없애고 사용자 정보를 출력합니다. */
        // setLoginStatus()
        this.email = this.naverLogin.user.getEmail()
        this.nickName = this.naverLogin.user.getNickName()
        this.gender = this.naverLogin.user.getGender()
      }
    })
  },
  unmounted() {},
  methods: {
    naverLogout(event) {
      event.preventDefault()
      this.naverLogin.logout()
    }
  }
}
</script>
