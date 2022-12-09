import VueCookies from 'vue-cookies'

export const user = {
  // 중앙 데이터 저장소
  namespaced: true,
  state() {
    return {
      userInfo: {
        name: '',
        email: '',
        phone: '',
        lang: ''
      }
    }
  },
  // store를 위한 computed
  getters: {
    isLogin(state) {
      if (VueCookies.get('userInfo')) {
        return true
      } else {
        return false
      }
    },
    isKakaoLogin() {
      if (window.Kakao.Auth.getAccessToken()) {
        return true
      } else {
        return false
      }
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log(userInfo)
      state.userInfo = userInfo
      VueCookies.set('userInfo', userInfo, '30s')
    },
    clearUserInfo(state) {
      state.userInfo = {}
      VueCookies.remove('userInfo')
    },
    getUserInfo(state) {
      if (VueCookies.get('userInfo')) {
        return state.userInfo
      } else {
        return {}
      }
    }
  },
  actions: {}
}
