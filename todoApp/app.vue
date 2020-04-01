<template>
  <div id="app">
    <h1>Fejavu Todo Apps</h1>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
 components: {
   TodoList
 } 
}
</script>

<style lang="scss" scoped>
  @import './variables.scss'

</style>