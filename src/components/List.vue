<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <!-- クリックイベント時に、removelistメソッドをハンドル -->
      <p class="list-counter">total: {{ totalCardList }}</p>
      <div class="deletelist" @click="removelist">✖︎</div>
    </div>
    <!-- Cardコンポーネントを呼び出し、Cardコンポーネントに必要なデータを渡します。 -->
    <!-- 必要なデータとは、先ほどCardコンポーネント作成時にpropsで受け取れるように定義したデータのことです。 -->
    <!-- 受け渡すカードの配列データcardsをv-forディレクティブを使って展開 -->
    <!-- 展開した値をv-bindディレクティブを使ってバインドさせます。 -->
    <!-- このcardsデータは、List.vueは持っていないので、新たにBoard.vueからpropsで受け取る必要があります。 -->
    <card v-for="(item, index) in cards"
        :body="item.body"
        :key="item.id"
        :cardIndex="index"
        :listIndex="listIndex"
    />
    <!-- CardAddコンポーネントをListコンポーネントで呼び出す -->
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
  import CardAdd from './CardAdd'
  import Card from './Card'

  export default {
    components: {
      CardAdd,
      Card
    },
    // propsには、親コンポーネントから受け取るデータを定義できます
    // 受け取ったデータはdataプロパティと同じようにアクセスできます
    // propsでデータを受け取る時は、型などの条件を指定できます。
    // 今回はString型で受け取ること,必ず受け取ること
    props: {
      title: {
        type: String,
        required: true
      },
      cards: {
        type: Array,
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
    },
    // propsで受け取っているcardsのデータを利用してその総数を返せるようにします。
    computed: {
      totalCardList: function() {
        return this.cards.length
      }
    }
  }
</script>