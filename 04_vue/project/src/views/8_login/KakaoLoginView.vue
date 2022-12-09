<template>
  <div>
    <a id="kakao-login-btn" @click="kakaoLogin">
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
    <p id="token-result"></p>
    <button @click="kakaoLogout" class="btn btn-danger">카카오 로그아웃</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, gender',
        success: this.getKakaoAccount,
        fail: function (e) {
          alert(JSON.stringify(e))
        }
      })
    },
    getKakaoAccount(authObj) {
      console.log(authObj)
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
          const kakaoAccount = res.kakao_account
          console.log(kakaoAccount)
          const nickName = kakaoAccount.profile.nickname
          const email = kakaoAccount.email
          const gender = kakaoAccount.gender

          console.log('nickname', nickName)
          console.log('email', email)
          console.log('gender', gender)
          this.$router.push({ path: '/login/main' })
        }
      })
    },
    kakaoLogout() {
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log('로그인 하지 않았습니다')
      }
      window.Kakao.Auth.logout((res) => {
        console.log('Access token', window.Kakao.Auth.getAccessToken())
        console.log('logout', res)
      })
    }
  }
}
</script>
