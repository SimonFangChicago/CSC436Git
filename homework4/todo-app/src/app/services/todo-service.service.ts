import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

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

  constructor(private db: AngularFirestore) {
  	this.tasks = db.collection<Task>(config.collection_endpoint);
  	this.tasks_observation = db.collection(config.collection_endpoint).valueChanges();

  	let index = 0;
  	this.tasks_observation.forEach((task)=>
  	{
  		console.log (task[index]);
  		index++;
  	});
  }

	addTask(task) {
		this.tasks.add(task);
	}

	updateTask(id, update) {
	   this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
	   this.taskDoc.update(update);
	}

	deleteTask(id) {
	   this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);
	   this.taskDoc.delete();
	}
}
