<template>
  <form :class="classList" @submit.prevent= "addCardToList">
    <!-- v-modelにbodyを定義することで、dataプロパティとバインドさせます。 -->
    <input v-model="body"
        type="text"
        class="text-input"
        placeholder="Add new card"
        @focusin="startEditing"
        @focusout="finishEditing"
    />
    <button type="submit" 
          class="add-button"
          v-if="isEditing || bodyExists"
    >
      Add
    </button>
  </form>
</template>

<script>
export default {
  // propsでaddCardToListメソッドで必要なlistIndexをListコンポーネントから受け取る
  props: {
    listIndex: {
      type: Number,
      required: true,
    }
  },
  data: function() {
    return {
      // バインドさせるbody
      body: '',
      isEditing: false,
    }
  },
  computed: {
    classList() {
      const classList = ['addcard']
      if (this.isEditing) {
        classList.push('active')
      }
      if (this.bodyExists) {
        classList.push('addable')
      }
      return classList
    },
    bodyExists() {
      return this.body.length > 0
    }
  },
  methods: {
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
    addCardToList: function() {
      // dispatchでactionsに定義したaddCardToListを実行します。
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body=''
    }
  }
}
</script>