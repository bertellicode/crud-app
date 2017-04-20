export const firebaseConfig = {
    apiKey: "AIzaSyB4_XKCJHjgSdDlPAB0yhVRJPvvEBr2Fr4",
    authDomain: "crud-app-e57b1.firebaseapp.com",
    databaseURL: "https://crud-app-e57b1.firebaseio.com",
    projectId: "crud-app-e57b1",
    storageBucket: "crud-app-e57b1.appspot.com",
    messagingSenderId: "1044880472697"
};


export class FirebaseList {

  subscribe(emit) {
    let ref = firebaseDb.ref(this._path);
    let initialized = false;
    let list = [];

    ref.once('value', () => {
      initialized = true;
      emit(this._actions.onLoad(list));
    });

    ref.on('child_added', snapshot => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      }
      else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', snapshot => {
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    ref.on('child_removed', snapshot => {
      emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    this._unsubscribe = () => ref.off();
  }

  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snapshot) {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs);
  }

}