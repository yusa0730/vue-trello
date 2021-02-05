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
    // mutationsのremovelistでは受け取ったリストのインデックスを使ってspliceでリストを削除します。
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    // mutationsのaddCardToListメソッドは、stateのデータへ追加します。
    // lists配列の中の1つのオブジェクト{}がリスト1つになります。
    // リスト内でカードを複数持てるように、配列型でcardsを定義しています。
    // addCardToListメソッドは、このcardsへ新しく作成されたカードを追加します。
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body})
    }
  },
  actions: {
    // actionsは第一引数にcontextというストアインスタンスのメソッドやプロパティを呼び出せるオブジェクトを受け取ることができます
    // 第二引数には、mutationsに渡す引数を指定できます。
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    // actionsでmutationsのremovelistメソッドをcommitで実行しています。
    removelist(context, payload) {
      context.commit('removelist', payload )
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    }
  },
  // 分割したファイル名をmodulesでまとめて定義してストアインスタンスを生成します。
  // 今回はストアの定義は1ファイルだけなのでmodulesの代わりにgettersを定義
  getters: {
  },
})

// データの状態を更新後にlocalStorageへデータの状態を保存しています。
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取ります。
store.subscribe((mutation, state) => {
  // localStorage.setItem('設定するキー', 文字列型のデータ)でデータの状態を更新後にlocalStorageへデータの状態を保存しています。
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

// main.jsでインポートできるようにexport defaultしています。
export default store
