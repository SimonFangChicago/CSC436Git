import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import {BusniessCardModel} from '../model/busniess-card-model';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {

	public cards: AngularFirestoreCollection<BusniessCardModel>;
	private cardsDoc: AngularFirestoreDocument<BusniessCardModel>;

	public cardsInfos: Observable<any[]>;

	callbackWhenDataChanged:() => void;

	tobeEditedCard : any;

	private collectionName : string;

  constructor(private db: AngularFirestore) { 
  	this.collectionName = 'cards_info'

  	this.cards = db.collection<BusniessCardModel>(this.collectionName);

  	console.log(this.collectionName);

  	console.log(this.cards);

  	this.cardsInfos = this.db
		.collection(this.collectionName)
		.snapshotChanges().pipe(
		map(actions => {
		   return actions.map(a => {
		     //Get document data
		     const data = a.payload.doc.data() as BusniessCardModel;

		     //Get document id
		     const id = a.payload.doc.id;

         const isNew = false;
		     //Use spread operator to add the id to the document data
		     return { id,isNew, ...data};
		   });
		}));

		console.log(this.cardsInfos);
  }

  add(card) {
		this.cards.add(card);
    this.cardsInfos = this.db
    .collection(this.collectionName)
    .snapshotChanges().pipe(
    map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as BusniessCardModel;

         //Get document id
         const id = a.payload.doc.id;

         const isNew = false;

         //Use spread operator to add the id to the document data
         return { id, isNew,...data};
       });
    }));
    this.setTobeEditedCard(null);
    if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

	update(id, update) {
	   this.cardsDoc = this.db.doc<BusniessCardModel>(`${this.collectionName}/${id}`);
	   this.cardsDoc.update(update);
     this.cardsInfos = this.db
    .collection(this.collectionName)
    .snapshotChanges().pipe(
    map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as BusniessCardModel;

         //Get document id
         const id = a.payload.doc.id;

         const isNew = false;

         //Use spread operator to add the id to the document data
         return { id,isNew, ...data};
       });
    }));
    this.setTobeEditedCard(null);
     if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

	delete(id) {
	   this.cardsDoc = this.db.doc<BusniessCardModel>(`${this.collectionName}/${id}`);
	   this.cardsDoc.delete();
     this.cardsInfos = this.db
    .collection(this.collectionName)
    .snapshotChanges().pipe(
    map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as BusniessCardModel;

         //Get document id
         const id = a.payload.doc.id;

         const isNew = false;
         //Use spread operator to add the id to the document data
         return { id,isNew, ...data};
       });
    }));
     if(this.callbackWhenDataChanged!=null) this.callbackWhenDataChanged();
	}

setTobeEditedCard(card):void{
    if(card == null)
    {
      this.newEmptyCard();
    }
    else
    {
      this.tobeEditedCard = card;
    }
    
  }

  getTobeEditedCard():BusniessCardModel{
    if(this.tobeEditedCard == null)
       this.newEmptyCard();
    return this.tobeEditedCard;
  }

  newEmptyCard():void{

    this.tobeEditedCard = {
        isNew:true,
  			firstName:'',
  			lastName:'',
  			email: '',
  			phoneNumber: '',
  			additionalInfo: ''
  		};
  }
}
