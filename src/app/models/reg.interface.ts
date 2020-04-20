import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Reg {
  email: string;
  Fname: string;
  Lname: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private RegCollection: AngularFirestoreCollection<Reg>;

  private Regs: Observable<Reg[]>;

  constructor(db: AngularFirestore) {
    this.RegCollection = db.collection<Reg>('users');

    this.Regs = this.RegCollection.snapshotChanges().pipe(
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
    return this.Regs;
  }

  getUser(Email) {
    return this.RegCollection.doc<Reg>(Email).valueChanges();
  }

  updateUser(Regs: Reg, Email: string) {
    return this.RegCollection.doc(Email).update(Regs);
  }

  addUser(Regs: Reg) {
    return this.RegCollection.add(Regs);
  }

  removeUser(Email) {
    return this.RegCollection.doc(Email).delete();
  }

}