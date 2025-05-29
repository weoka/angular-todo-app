import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '@models/todo';
import { AutofocusDirective } from 'src/app/directives/autofocus.directive';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AutofocusDirective],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggleComplete = new EventEmitter<Todo>;
  @Output() deleteTodo = new EventEmitter<Todo>;
  @Output() todoUpdated = new EventEmitter<Todo>;

  editingTodoId: string | null  = null;
  currentEditTitle: string = '';

  onEdit(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.currentEditTitle = todo.title;
  }

  onSaveEdit(originalTodo: Todo): void {
    if (this.editingTodoId === null){
      return;
    }

    const newTitle = this.currentEditTitle.trim();

    if (newTitle && newTitle !== originalTodo.title){
      const updatedTodo: Todo = {...originalTodo, title: newTitle};
      this.todoUpdated.emit(updatedTodo);
    }

    this.editingTodoId = null;
  }

  onCancelEdit(): void {
    if (this.editingTodoId){
      this.editingTodoId = null;
    }
  }


  onToggleCheckbox(todo: Todo): void {
    this.toggleComplete.emit(todo);
  }

  onClickDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }
}
