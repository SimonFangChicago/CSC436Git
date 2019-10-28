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
