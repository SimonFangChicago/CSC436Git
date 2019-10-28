import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { TodoServiceService } from '../services/todo-service.service';
import { Observable } from 'rxjs';
import {config} from '../model/task.moudle';
import {Task} from '../model/task.moudle';
import { map } from 'rxjs/operators';
import { TodoItemComponent } from '../todo-item/todo-item.component';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	tasks: Observable<any[]>;

	constructor(private db: AngularFirestore, private taskService: TodoServiceService) { 
		
	}

  	ngOnInit() {
		this.tasks = this.db
		.collection(config.collection_endpoint)
		.snapshotChanges().pipe(
		map(actions => {
		   return actions.map(a => {
		     //Get document data
		     const data = a.payload.doc.data() as Task;
		     //Get document id
		     const id = a.payload.doc.id;
		     //Use spread operator to add the id to the document data
		     return { id, ...data};
		   });
		}));
	}

}
