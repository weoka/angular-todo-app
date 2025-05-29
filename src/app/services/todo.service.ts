import { Injectable } from '@angular/core';
import { Todo } from '@models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private localStorageKey = 'mydayapp-angular';

  getTodos() : Todo[] {
    if (typeof localStorage !== 'undefined' ) {
      const todosJson = localStorage.getItem(this.localStorageKey);
      return todosJson ? JSON.parse(todosJson) : [];
    }
    return [];
  }

  public saveTodos(todos: Todo[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
    }
  }

  addTodo(newTodo: Todo): void {
    const todos = this.getTodos();

    console.log("old object: ", JSON.parse(JSON.stringify(todos)))
    todos.push(newTodo);
    this.saveTodos(todos);
    console.log("new object: ", JSON.parse(JSON.stringify(todos)))
  }

  updateTodo(updatedTodo: Todo): void {
    let currentTodo = this.getTodos();

    currentTodo = currentTodo.map(todo => todo.id === updatedTodo.id ? updatedTodo: todo);
    this.saveTodos(currentTodo)
  }

  clearCompletedTodos(): void {
    let currentTodos = this.getTodos();
    currentTodos = currentTodos.filter(todo => !todo.completed);
    this.saveTodos(currentTodos);
  }
}
