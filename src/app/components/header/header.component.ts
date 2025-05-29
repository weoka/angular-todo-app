import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  newTodoTitle: string = '';

  @Output() todoAdded = new EventEmitter<Todo>();

  handleEnterKey(): void {
    const title = this.newTodoTitle.trim()

    if (title){
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: title,
        completed: false
      }

      this.todoAdded.emit(newTodo);
      this.newTodoTitle = '';

      console.log("New todo:", newTodo);
    }
  }

}
