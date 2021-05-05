import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: 'aaa',
    // 下一个ID
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 重新为InputValue赋值
    setInputValue(state, value) {
      state.inputValue = value
    },
    // 添加列表项目
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据ID删除对应的任务事项
    removeItem(state, id) {
      // 1.根据id查找对应项的索引
      const i = state.list.findIndex(item => item.id === id)
      // 2.根据索引，删除对应的元素
      if (i != -1) {
        state.list.splice(i, 1)
      }
    },
    // 根据id 修改列表项的选中状态
    changeStatus(state, params) {
      // 1.查找索引
      const index = state.list.findIndex(item => item.id === params.id)

      // 2.根据索引修改列表项的状态
      if (index != -1) {
        state.list[index].done = params.status
      }
    },
    // 清除已完成的任务
    clearDone(state) {
      state.list = state.list.filter(item => item.done == false)
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    // 请求列表数据
    getList(context) {
      // 解构赋值
      axios.get('/list.json').then(({ data }) => {
        console.log(data);
        context.commit('initList', data)
      })
    }
  },
  modules: {
  },
  getters: {
    //统计为完成任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done == false).length
    },
    // 根据 viewkey 返回不同的数据，切换显示 全部、已完成、未完成
    infoList(state) {
      if (state.viewKey == 'all') {
        return state.list
      }

      if (state.viewKey == 'undone') {
        return state.list.filter(item => item.done == false)
      }

      if (state.viewKey == 'done') {
        return state.list.filter(item => item.done == true)
      }

      return state.list
    }
  }
})
