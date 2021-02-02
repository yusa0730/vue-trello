<template>
<!-- 
サブミットイベント時にaddListメソッドをハンドルしています。
v-onディレクティブでイベントをハンドルでき、@はv-onの省略記法になります。
また、.preventはVueのイベント修飾詞であり、サブミット時にリロードされるのを防ぎます。 
-->
  <form class="addlist" @submit.prevent="addlist">
    <!-- v-modelにtitleを定義することで、dataプロパティとバインドさせます。

    データをバインドさせる(データバインディング)とは、
    scriptで定義したdataプロパティをテンプレートでもリアルタイムにそのまま共有（紐付け）できるような仕組みです。

    ここで使うv-modelはv-onとv-bindの2つの機能を持ち合わせています。 
    v-modelは今回のようなinputやselect、textareaなどのフォーム要素に対して使うことができます。
    -->
    <input v-model="title"
          type="text"
          class="text-input"
          placeholder="Add new list"
    >
    <button type="submit" class="add-button">
      Add
    </button>
  </form>
</template>

<script>
  export default {
    data: function() {
      return {
        title: "",
      }
    },
    methods: {
      addList: function(){
        // this.$store.dispatch('アクション名')でactionsを実行できます。
        // 第二引数にオブジェクト型でdataプロパティのtitleを渡します。
        this.$store.dispatch('addlist', { title:this.title })
        this.title =""
      }
    },
  }
</script>

<script>
export default {
  data: function() {
    return {
      title: '',
    }
  },
  methods: {
    addList: function() {
      this.$store.dispatch('addlist', { title: this.title })
      this.title = ''
    },
  }
}
</script>