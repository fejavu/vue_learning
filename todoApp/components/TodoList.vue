<template>
  <div>
    <BaseInputText
      v-model="newTodoText"
      placeholder="New todo"
      v-on:keydown.enter="addTodo"
    />
    <ul v-if="todos.length">
      <TodoListItem
        v-for="todo in todos"
        v-bind:key ="todo.id"
        v-bind:todo="todo"
        @remove="removeTodo"
      />
    </ul>

    <p v-else>
      Nothing left in the Todo List. Add a new one!
    </p>
  </div>
</template>

<script>
import BaseInputText from './BaseInputText.vue';
import TodoListItem from './TodoListItem.vue';

let nextTodoId = 1;
export default {
  components: {
    BaseInputText,
    TodoListItem
  },

  data: {
    newTodoText: '',
    todos: [
      {
        id: nextTodoId++, 
        text: 'Learn Vue'
      },
      {
        id: nextTodoId++, 
        text: 'Fall in Vue'
      },
    ]
  },

  methods: {
    addTodo: function() {
      const trimedText = this.newTodoText.trim();
      if(trimedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimedText
        });
      }
      this.newTodoText='';
    },
    removeTodo: function(todoId) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== todoId;
      })
    }
  }
}
</script>