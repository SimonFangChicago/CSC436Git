import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Task} from '../model/task.moudle';
import {config} from '../model/task.moudle';

import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  tasks: AngularFirestoreCollection<Task>;
	private taskDoc: AngularFirestoreDocument<Task>;

  editingMode:boolean;
  tobeEditedTask : Task;

  callbackWhenDataChanged:() => void;

  constructor(private db: AngularFirestore) {
  	this.tasks = db.collection<Task>(config.collection_endpoint);
    this.editingMode = false;
  }

	addTask(task) {
    task.id = this.newGuid();
		this.tasks.add(task);

    if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

	updateTask(id, update) {
	   this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
	   this.taskDoc.update(update);

     if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

	deleteTask(id) {
	   this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
	   this.taskDoc.delete();

     if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

  setTobeEditedTask(task):void{
    if(task == null)
    {
      this.newEmptyTask();
    }
    else
    {
      this.tobeEditedTask = task;
    }

    this.setEditMode(true);
    
  }

  getTobeEditedTask():Task{
    if(this.tobeEditedTask == null)
      this.newEmptyTask();
    return this.tobeEditedTask;
  }

  isEditMode():boolean
  {
    return this.editingMode;
  }

  setDataChangeCallback(cb):void
  {
    this.callbackWhenDataChanged = cb;
  }

  setEditMode(state):void
  {
    this.editingMode = state;
    if(state == false)
    {
      this.newEmptyTask();
    }
  }

  newEmptyTask():void{
    this.tobeEditedTask = {id:"0",description:"",dueDate:"Days"};
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
