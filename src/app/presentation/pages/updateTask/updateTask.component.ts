import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updateTaskUseCase } from '../../../core/use-cases/update-task.use-case';
import { Task } from '../../../interfaces/task.interface';
import { OpenAiService } from '../../services/openAi.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './updateTask.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTaskComponent {
  public myForm = signal<FormGroup | undefined>(undefined);
  task!: Task;
  taskId = this.route.snapshot.paramMap.get('id');

  constructor(
    private openAiService: OpenAiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.taskId) {
      this.task = await this.openAiService.findOneTask(this.taskId);
      this.initForm();
    }
  }

  private initForm() {
    this.myForm.set(this.fb.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description],
      tags: [this.task.tags],
      urgency: [this.task.urgency],
      date: [this.task.date],
    }));
  }

  async updateTask() {
    if (this.myForm()!.invalid) return;
    const { name, description, tags, urgency, date } = this.myForm()!.value;
    await updateTaskUseCase({ name, description, tags, urgency: `${urgency}`, date }, this.taskId!);
    this.router.navigate(['/tasks']);
  }
}
