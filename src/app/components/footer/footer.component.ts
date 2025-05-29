import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Todo } from '@models/todo';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() todos: Todo[] = [];
  @Output() clearCompleted = new EventEmitter<void>();

  constructor() {}

  get pendingTodoCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get itemPluralization(): string {
    return this.pendingTodoCount === 1 ? 'item' : 'items';
  }

  get hasCompletedTodos(): boolean {
    return this.todos.some(todo => todo.completed);
  }

  onClearCompletedClick(): void {
    this.clearCompleted.emit();
  }

}
