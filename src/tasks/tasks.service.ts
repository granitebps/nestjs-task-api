import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TaskRepository) {}

  getTasks(filter: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filter);
  }

  async getTaskById(id: string): Promise<Task> {
    const record = await this.tasksRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException('Task not found!');
    }
    return record;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found!');
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
