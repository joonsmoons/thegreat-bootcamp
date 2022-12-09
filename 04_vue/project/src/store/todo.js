export const todo = {
  // 중앙 데이터 저장소
  namespaced: true,
  state() {
    return {
      todos: [
        { id: 1, title: 'todo 1', done: true },
        { id: 2, title: 'todo 2', done: false },
        { id: 3, title: 'todo 3', done: false }
      ],
      user: {}
    }
  },
  // store를 위한 computed
  getters: {
    todosCount(state) {
      return state.todos.length
    },
    doneTodosCount(state) {
      return state.todos.filter((todo) => todo.done).length
    },
    notDoneTodosCount(state) {
      return state.todos.filter((todo) => !todo.done).length
    }
  },
  mutations: {
    add(state, item) {
      state.todos.push(item)
    },
    remove(state, id) {
      state.todos = state.todos.filter((todo) => id !== todo.id)
    },
    done(state, id) {
      const foundState = state.todos.find((todo) => todo.id === id)
      foundState.done = !foundState.done
    }
  },
  // mutation 하고 비슷,
  // actions에 정의한 함수에서는 결국 mutations에 정한 함수를 커밋시켜서 state를 변경
  // 비동기 처리가 가능함
  actions: {
    add({ commit }, item) {
      // or simply {context}
      // context.commit, context.state

      // 서버랑 통신, fetch, axios
      commit('add', item)
    }
    // add2: async({commit}, item) => {
    //   await fetch('', {})
    // }
  }
}
