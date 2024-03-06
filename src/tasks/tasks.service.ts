import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: uuid(),
      title: 'Do something',
      description: 'Do something description',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    if (task) {
      const newTask = Object.assign(task, updatedFields);
      this.tasks = this.tasks.map((t) => (t.id === id ? newTask : t));
      return newTask;
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'Task deleted successfully!';
  }
}
