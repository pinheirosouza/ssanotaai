import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  createRecord(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  updateRecord(collection: string, recordId: any, data: any) {
    this.firestore.doc(`${collection}/${recordId}`).update(data);
  }

  deleteRecord(collection: string, recordId: any) {
    this.firestore.doc(`${collection}/${recordId}`).delete();
  }
}
