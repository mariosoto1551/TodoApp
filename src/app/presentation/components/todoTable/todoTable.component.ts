import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, signal } from '@angular/core';
import { Task } from '../../../interfaces/task.interface';
import { RouterModule } from '@angular/router';
import { getTasksUseCase } from '../../../core/use-cases/get-tasks.use-case';
import { deleteTaskUseCase } from '../../../core/use-cases/delete-task.use-case';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './todoTable.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTableComponent implements OnInit {
  public taskList = signal<Task[]>([]);

  async ngOnInit() {
    await this.loadTasks() // Para verificar el contenido de la señal
  }
  async deleteTask(id: string){
    await deleteTaskUseCase(id)
    await this.loadTasks()
  }
  async loadTasks(){
    const tasks = await getTasksUseCase() as Task[];
    if (tasks) {
      this.taskList.set(tasks); // Asignamos los valores a la señal
    }

  }
}
