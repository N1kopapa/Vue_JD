export default {
  showLoading: ({commit}) => {
    console.log('action:I want to showLoading')
    commit('showLoading')
  },
  hideLoading: ({commit}) => {
    console.log('action:I want to hideLoading')
    commit('hideLoading')
  },
  showNav: ({commit}) => {
    commit('showNav')
  },
  hideNav: ({commit}) => {
    console.log('I want to hide Nav')
    commit('hideNav')
  },
  setUserInfo: ({
                  commit,
                  userInfo
                }) => {
    commit('setUserInfo', userInfo)
  }
}
