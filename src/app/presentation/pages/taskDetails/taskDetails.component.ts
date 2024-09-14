import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { OpenAiService } from '../../services/openAi.service';
import { Task } from '../../../interfaces/task.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './taskDetails.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskDetailsComponent {
  task = signal<Task | undefined>(undefined);
  taskId = this.route.snapshot.paramMap.get('id');

  constructor(private openAiService: OpenAiService, private route: ActivatedRoute) {}

  async ngOnInit() {
    if (this.taskId) {
      this.task.set(await this.openAiService.findOneTask(this.taskId));
    }
    console.log(this.task);
  }
}
