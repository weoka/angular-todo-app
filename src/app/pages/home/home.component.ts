import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { Todo } from '@models/todo';
import { TodoListComponent } from "../../components/todo-list/todo-list.component";
import { TodoService } from '@services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TodoListComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  public displayedTodos: Todo[] = [];
  public currentFilter: string = ''

  private routeParamsSubscription!: Subscription
  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadTodos();

    this.routeParamsSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const filterParam = params.get('filter');

      if (filterParam === 'pending' || filterParam === 'completed') {
        this.currentFilter = filterParam;
      } else {
        this.currentFilter = '';
      }
      this.applyFilter();
    })
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.currentFilter === 'pending') {
      this.displayedTodos = this.todos.filter(todo => !todo.completed);
    } else if (this.currentFilter === 'completed') {
      this.displayedTodos = this.todos.filter(todo => todo.completed);
    } else {
      this.displayedTodos = [...this.todos];
    }
  }
  onNewTodoFromHeader(newTodo: Todo){
    this.todoService.addTodo(newTodo);
    this.loadTodos();
  }

  onToggleTodoComplete(todoToToggle: Todo): void {
    const updatedTodo = {...todoToToggle, completed: !todoToToggle.completed }
    this.todos = this.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    this.todoService.saveTodos(this.todos);
    this.loadTodos();
    this.applyFilter();
  }

  onDeleteTodo(todoToDelete: Todo): void {
    this.todos = this.todos.filter(todo => todo.id !== todoToDelete.id);
    this.todoService.saveTodos(this.todos);
    this.loadTodos();
    this.applyFilter();
  }

  onTodoTitleUpdated(updatedTodo: Todo): void {
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  onClearCompletedTodos(): void {
    this.todoService.clearCompletedTodos();
    this.loadTodos()
  }

}
