<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <div class="list-index">
        <!-- Listコンポーネントを呼び出し、Listコンポーネントに必要なデータを渡しています。 -->
        <!-- 必要なデータとは、先ほどListコンポーネント作成時にpropsで受け取れるように定義したデータのこと -->
        <!-- v-bindは:と省略して記述できます -->
        <!-- :キー名これでバインドさせたコンポーネントにデータを受け渡すことができます。 -->
        <!-- 受け渡すlistsデータをlocalStrageから取得する -->
        <!-- src/store/index.jsのstateでlocalStrageに保存されたリストのデータlistsの状態を取得 -->
        <list v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :listIndex="index"
          :cards="item.cards"
        />
        <list-add/>
      </div>
    </main>
  </div>
</template>

<script>
  import ListAdd from './ListAdd.vue'
  import List from './List'
  import { mapState } from 'vuex'

  // export defaultと宣言することで、
  // このコンポーネントを他のコンポーネントからimportして使用できるようになります。
  export default {
    components: {
      ListAdd,
      List,
    },
    // src/store/index.jsのstateのリストデータlistsをコンポーネントのcomputedプロパティで取得
    // ストアにある状態を Vue コンポーネント に表示するにはストアの状態を 算出プロパティ (opens new window)で返すこと
    computed: {
      // 算出ゲッター関数を生成し、いくつかのキーストロークを省くのに役立つ mapState ヘルパー
      // mapState はオブジェクトを返すことに注意
      // オブジェクトスプレット演算子(...の部分)で、外のオブジェクトとこのオブジェクトを混ぜる
      // computedにストアのstateからのデータと、ローカルでの算出データを両方定義する場合には、このように書く必要がある
      // これで、stateのlistsの状態が変わるたびにコンポーネントでcomputedがlistsを返す仕組みが完成しました
      ...mapState([
        'lists'
      ]),
    },
  }
</script>