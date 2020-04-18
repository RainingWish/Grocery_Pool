import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface User {
  id: string;
  email:string;
  username: string;
  location:Geolocation;
  title: string;
  description: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private UsersCollection: AngularFirestoreCollection<User>;
 
  private Users: Observable<User[]>;
 
  constructor(db: AngularFirestore) {
    this.UsersCollection = db.collection<User>('users');
 
    this.Users = this.UsersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getUsers() {
    return this.Users;
  }
 
  getUser(id) {
    return this.UsersCollection.doc<User>(id).valueChanges();
  }
 
  updateUser(User: User, id: string) {
    return this.UsersCollection.doc(id).update(User);
  }
 
  addUser(User: User) {
    return this.UsersCollection.add(User);
  }
 
  removeUser(id) {
    return this.UsersCollection.doc(id).delete();
  }

}