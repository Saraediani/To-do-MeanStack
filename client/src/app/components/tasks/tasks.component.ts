import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((response) => {
      this.tasks = response
      });
  }

  deleteTask(task: Task): void {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t._id !== task._id))
      );
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe((task) => {
      this.tasks = this.tasks.map((t) => (t._id === task._id ? task : t));
    }
    );
  }

  toggleReminder(task: Task): void {
    this.taskService.updateReminder(task).subscribe();
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((response) => this.tasks.push(response["data"]));
  }

}
