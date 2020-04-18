import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user.interface';
import {AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}
  
  createUser(
    userName: string,
    email: string,
    location: Geolocation,
    title:string,
    description:string
  ): Promise<void> {
    const id = this.firestore.createId();  
    return this.firestore.doc(`UserList/${id}`).set({
      id,
      userName,
      email,
      location,
      title,
      description
    });
  }

  getUserList(): AngularFirestoreCollection<User> {
    return this.firestore.collection(`UserList`);
  }
  getUserDetail(userId: string): AngularFirestoreDocument<User> {
    console.log("user Id: ",userId);
    return this.firestore.collection("UserList").doc(userId);
  }
}
