import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Task } from 'src/app/models/Task';
import { Subscription, timeoutWith } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20%)' }), //apply default styles before animation starts
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }), //apply default styles before animation starts
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-20%)' })
        ),
      ]),
    ]),
  ],

})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  title!: string;
  description!: string;
  status: boolean = false;
  type: string;
  dueDate: Date;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {

  }


  onSubmit(): void {
    if (!this.title) {
      alert('Please add a task');
      return;
    }

    const newTask: Task = {
      title: this.title,
      description: this.description,
      status: this.status,
      type: this.type,
      dueDate: this.dueDate,
      token: localStorage.getItem('token'),
    };

    // emit event
    this.onAddTask.emit(newTask);
console.log(newTask);

    // clear form afterwards
    this.title = '';
    this.description = '';
    this.status = false;
    this.type = '';
    this.dueDate = null;
  }

}
