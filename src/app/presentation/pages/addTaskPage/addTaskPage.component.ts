import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addTaskUseCase } from '../../../core/use-cases/add-task.use-case';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-task-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addTaskPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddTaskPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    tags: [''],
    urgency: [1],
    date: [''],
  });
  constructor(private fb: FormBuilder, private router: Router) {}
  async addTask(){
    if(this.myForm.invalid)return;
    const {name, description, tags, urgency, date} = this.myForm.value;
    console.log({ name, description, tags, urgency: `${urgency}`, date });
    await addTaskUseCase({ name, description, tags, urgency: `${urgency}`, date })
    this.router.navigate(['/tasks'])
  }
}
