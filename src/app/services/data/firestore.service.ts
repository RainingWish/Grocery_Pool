import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user.interface';
import { Reg } from '../../models/reg.interface';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createUser(
    userName: string,
    email: string,
    location: Geolocation,
    title: string,
    description: string
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

  Reg(
    Fname: string,
    Lname: string,
    email: string,
    Password: string
  ): Promise<void> {
    return this.firestore.doc(`RegList/${email}`).set({
      Fname,
      Lname,
      email,
      Password
    });
  }

  getUserList(): AngularFirestoreCollection<User> {
    return this.firestore.collection(`UserList`);
  }
  getUserDetail(userId: string): AngularFirestoreDocument<User> {
    return this.firestore.collection(`UserList`).doc(userId);
  }

  getRegList(): AngularFirestoreCollection<Reg> {
    return this.firestore.collection(`RegList`);
  }
  getRegDetail(Email: string): AngularFirestoreDocument<Reg> {
    return this.firestore.collection(`RegList`).doc(Email);
  }

}
