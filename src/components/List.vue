<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <!-- クリックイベント時に、removelistメソッドをハンドル -->
      <div class="deletelist" @click="removelist">✖︎</div>
    </div>
  </div>
</template>

<script>
  export default {
    // propsには、親コンポーネントから受け取るデータを定義できます
    // 受け取ったデータはdataプロパティと同じようにアクセスできます
    // propsでデータを受け取る時は、型などの条件を指定できます。
    // 今回はString型で受け取ること,必ず受け取ること
    props: {
      title: {
        type: String,
        required: true
      },
      listIndex: {
        type: Number,
        required: true
      }
    },
    methods: {
      // クリック時にハンドルされるように定義したremovelistメソッドをmethodsプロパティに定義しています
      removelist: function() {
        if(confirm('本当にこのリストを削除しますか？')){
          // this.$store.dispatchでstore/index.jsに定義したremovelistアクションを呼び出します。
          // this.$store.dispatch('アクション名')でindex.jsのactionsを実行できます。
          // 第二引数にオブジェクト型でdataプロパティのlistIndexを渡します。
          this.$store.dispatch('removelist', { listIndex: this.listIndex })
        }
      },
    }
  }
</script>