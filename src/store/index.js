import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ストアの状態はリロードされると初期化されてしまいます。
// リロードしても、初期化されないように、ストアのstateへ保存時に、localStorageにも同じ状態を保存できるように実装
// localStorageとは、Web Storageというクライアント側（ブラウザ）にデータを保存できる機能の1つです
// localStorageに保存されたデータは永続的に有効となります
// localStorage.getItem('設定したキー')でlocalStorageに保存したリストを取得します。
const savedLists = localStorage.getItem('trello-lists')

const store =  new Vuex.Store({
  // mutationsでリストのデータの状態を更新できるように、stateにリストを定義
  state: {
    // localStorageに保存されたリストがあれば取得、なければデフォルトのリスト配列を設置します。
    // localStorageにはJSON形式の文字列型でデータが保存されているので、
    // 取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要があります
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  // actionsでコミットするaddListメソッドをmutationsで定義
  // mutationsの重要なルールとして、同期的でなければならない
  // mutationsはあくまでもストアの状態の変更だけを行う。mutationsの呼び出しはactionsが行う
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
  },
  getters: {
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
