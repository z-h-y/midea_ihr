const state = {
  modelChange: false
}
const mutations = {
  formModelChange (state) {
    // state 模块的局部状态
    state.modelChange = true
  }
}
export default {
  state,
  mutations
}
