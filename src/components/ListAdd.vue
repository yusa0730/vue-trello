<template>
  <!-- 
  サブミットイベント時にaddListメソッドをハンドルしています。
  v-onディレクティブでイベントをハンドルでき、@はv-onの省略記法になります。
  また、.preventはVueのイベント修飾詞であり、サブミット時にリロードされるのを防ぎます。 
  -->
  <!-- v-bindの省略記法が : となります。 -->
  <form :class="classList" @submit.prevent="addList">
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
           @focusin="startEditing"
           @focusout="finishEditing"
    >
    <button type="submit"
            class="add-button"
            v-if="isEditing || titleExists">
      Add
    </button>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      // isEditingというフラグを立てて、trueの時（フォーカスされている時）だけstyleを追加する
      isEditing: false,
    }
  },
  // watchでも同じ処理を行うことができるが
  // watchは、データの変更があれば特定の関数を実行する。など少し複雑な処理を行いたいときに利用するのがよい。
  computed: {
    classList() {
      const classList = ['addlist']

      if (this.isEditing) {
        classList.push('active')
      }
      if (this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists() {
      return this.title.length > 0
    },
  },
  methods: {
    addList() {
      // this.$store.dispatch('アクション名')でindex.jsのactionsを実行できます。
      // 第二引数にオブジェクト型でdataプロパティのtitleを渡します。
      this.$store.dispatch('addlist', { title: this.title })
      this.title = ''
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    },
  }
}
</script>
