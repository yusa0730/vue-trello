<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <list-add/>
    </main>
  </div>
</template>

<script>
  import ListAdd from './ListAdd.vue'

  // export defaultと宣言することで、
  // このコンポーネントを他のコンポーネントからimportして使用できるようになります。
  export default {
    components: {
      ListAdd
    },
  }
</script>