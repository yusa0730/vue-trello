<template>
  <div id="app">
    <!-- ★Boardコンポーネント呼び出し --> 
    <!-- componentsに登録した名前で呼び出すことができます。 -->
    <board/>
  </div>
</template>

<script>
// コンポーネントを呼び出すときの名前は基本的にファイル名で定義します。
import Board from './components/Board.vue'


export default {
  name: 'App',
  components: {
    // ★コンポーネントに登録する
    // テンプレートでコンポーネントとして、呼び出すためにcomponentsプロパティへ名前を登録します。
    Board
  }
}
</script>
