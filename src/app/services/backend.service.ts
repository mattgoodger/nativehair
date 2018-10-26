import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(public afAuth : AngularFireAuth, private afs: AngularFirestore) { }

  getConfig() {
    return environment.social;
  }

  login(loginType, formData?) {
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if (formData) {
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    } else {
      let loginMethod;
      if (loginType == 'FB') { loginMethod = new firebase.auth.FacebookAuthProvider(); }
      if (loginType == 'GOOGLE') { loginMethod = new firebase.auth.GoogleAuthProvider(); }
      return this.afAuth.auth.signInWithRedirect(loginMethod);
    }
  }

  redirectLogin() {
    return this.afAuth.auth.getRedirectResult();
  }

  logout() {
   return this.afAuth.auth.signOut();
  }



  isUserLoggedIn(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
    .take(1)
    .map(state => !!state)
    .do(authenticated => {
      return authenticated;
    });
  }
  

  isUserAdmin() {
    let collUrl = !this.isUserLoggedIn() ? "abcd" : this.afAuth.auth.currentUser.uid;
    collUrl = "onlinestore/nativehair/admins/" + collUrl;
    return this.getDoc(collUrl);
  }

  getDoc(collUrl: string){
    this.itemDoc = this.afs.doc<any>(collUrl);
    return this.itemDoc.valueChanges();
  }

  get timestamp() {
    var d = new Date();
    return d;
    //return firebase.firestore.FieldValue.serverTimestamp();
  }

  getCollectionURL(filter) {
    return "onlinestore/nativehair/"+filter;
  }

  setDocs(coll: string, data: any, docId?: any) {
    const id = this.afs.createId();
    const item = { id, name};
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(item.id);
    return docRef.set({
      ...data,
      _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
      authid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
    });
  }

  getDocs(coll: string, filters?: any) {
    this.itemsCollection = this.afs.collection<any>(this.getCollectionURL(coll));
    return this.itemsCollection.valueChanges();
  }

  getOneDoc(collType,docId) {
    let docUrl = this.getCollectionURL(collType)+"/"+docId;
    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();
  }
  updateDocs(coll: string, data: any, docId?: any) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(data._id);
    return docRef.update({
      ...data,
      _id: id,
      updatedAt: timestamp,
      authid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
    });
  }

  delOneDoc(coll, docId) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp
    var docRef = this.afs.collection(this.getCollectionURL(coll)).doc(docId);
    return docRef.delete();
  }

  //Temp fake functions below

  getCartTotal(){
    let fakeresponse = '10';
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakeresponse)
        }, 2000)
      }
    )
  }
    getUserStatus(){
      let fakeresponse = true;
      return Observable.create(
        observer => {
          setTimeout(() => {
            observer.next(fakeresponse)
          }, 2000)
        }
      );
  }
  getProducts(collType){
    let fakeresponse = [{
      'category' : 'test',
      'scategory': 'Test',
      'name' : 'Product Name',
      'price' : '300',
      '_id': '12'
    }];
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakeresponse)
        }, 2000)
      }
    )
}

getFilterProducts(collType, filters) {
  let fakeresponse = [{
    'category' : 'test',
    'scategory': 'Test',
    'name' : 'Product Name',
    'price' : '300',
    '_id': '12'
  }];
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  )
}
setProducts(collType, filters) {
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  );
}

updateProducts(collType, filters) {
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  );
}
getOneProductDoc(collType, docId) {
  let fakeresponse = {
    'category' : 'test',
    'scategory': 'Test',
    'name' : 'Product Name',
    'price' : '300',
    '_id': '12'
  };
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  )
}
delOneProductDoc(collType, docId) {
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  )
}

updateShoppingInterest(collType, data) {
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  )
}

updateShoppingCart(collType, data) {
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() => {
        observer.next(fakeresponse)
      }, 2000)
    }
  )
}

}
