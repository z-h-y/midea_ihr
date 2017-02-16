const state = {
  expanded: false
}
const mutations = {
  mainExpanded (state, expanded) {
    // state 模块的局部状态
    state.expanded = expanded;
  }
}
export default {
  state,
  mutations
}
