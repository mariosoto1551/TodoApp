import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { getTaskUseCase } from '../../core/use-cases/get-task.use-case';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  constructor() { }
  async findOneTask(id: string): Promise<Task>{
    return await getTaskUseCase(id);
  }
}
