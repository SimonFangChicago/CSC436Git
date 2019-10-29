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

  tasks_observation: Observable<any[]>;
  tasks: AngularFirestoreCollection<Task>;
	private taskDoc: AngularFirestoreDocument<Task>;

  editingMode:boolean;
  tobeEditedTask : Task;

  callbackWhenDataChanged:() => void;

  constructor(private db: AngularFirestore) {
  	this.tasks = db.collection<Task>(config.collection_endpoint);
  	this.tasks_observation = this.db
    .collection(config.collection_endpoint)
    .snapshotChanges().pipe(
    map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as Task;
         //Get document id
         const id = a.payload.doc.id;
         //Use spread operator to add the id to the document data
         console.log({ id, ...data});
         return { id, ...data};
       });
    }));

    this.editingMode = false;
  }

	addTask(task) {
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
      this.tobeEditedTask = {description:""};
    }
    else
    {
      this.tobeEditedTask = task;
    }

    this.setEditMode(true);
    
  }

  newEmptyTask():void{
    this.tobeEditedTask = {description:""};
  }

  getTobeEditedTask():Task{
    if(this.tobeEditedTask == null)
      this.tobeEditedTask = {description:""};
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
      this.tobeEditedTask = {description:""};
    }
  }
}
