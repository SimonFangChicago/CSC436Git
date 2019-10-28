import { Component, OnInit } from '@angular/core';
import {Task} from '../model/task.moudle';
import {
  Input,        // <-- added,
  HostBinding
} from '@angular/core';

import { TodoServiceService } from '../services/todo-service.service';

import {DueDateEnum} from '../model/due_date_enum.moudle';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
	@HostBinding('attr.class') cssClass = 'row';
	@Input() task: Task;

	dueDate:DueDateEnum;
	dueDateEnum = DueDateEnum;

  constructor(private taskService: TodoServiceService) {
  	this.dueDate = DueDateEnum.Days;
  }

  ngOnInit() {
  }

  setUrgent():void
  {
  	this.dueDate = DueDateEnum.Urgent;
  }

  setDays():void
  {
  	this.dueDate = DueDateEnum.Days;
  }

  setWeek():void
  {
  	this.dueDate = DueDateEnum.Week;
  }

  deleteTask(task)
  {
  	console.log(task);
  	this.taskService.deleteTask(task.id);
  }

}
