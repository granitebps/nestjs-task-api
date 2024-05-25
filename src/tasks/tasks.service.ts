import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, desc: string): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description: desc,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
}
