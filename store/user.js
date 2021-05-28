export const state = () => ({
  account: null,
})

export const mutations = {
  setAccount(state, userObj) {
    if (!userObj) {
      state.account = {
        displayName: 'Guest',
        email: 'Guest Account',
      }
    }
    console.log(userObj)
    state.account = userObj
  },
  clearAccount(state) {
    state.account = null
  },
}
