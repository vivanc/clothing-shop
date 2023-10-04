import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpwU-nU3r1ik9owmSQzZ9ZWmi81UfHGt4",
  authDomain: "crwn-shop-59e82.firebaseapp.com",
  projectId: "crwn-shop-59e82",
  storageBucket: "crwn-shop-59e82.appspot.com",
  messagingSenderId: "1086017835139",
  appId: "1:1086017835139:web:1ddf895ba8d0ae83158bb6",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // you can generate different provider (provider is iniitiate as class)
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// instantiate auth instance
// users first auth with google with google popup, then from that user data in auth to create user in db
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// instantiate db instance
export const db = getFirestore();

// create a method to upload shop data to collection in firestore
// use collectionKey (collection name) to identify which collection in firebase to add to, objectsToAdd is just the shop-data.js
// because we are writing it to external source, we use async
// transaction concept.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = "title" // make it dynamic instead of making it object.title.toLowerCase().
) => {
  // create category table
  const collectionRef = collection(db, collectionKey);
  // wirte shop-data to category table, and need to apply transaction concept
  // writeBatch is going to return a batch
  const batch = writeBatch(db);
  // batch set each single object (category object with title and item array)
  objectsToAdd.forEach((object) => {
    // first to get docRef, pass collection ref instead of db, and we need to get title of single object
    const docRef = doc(collectionRef, object[field].toLowerCase());
    // batch .set on docRef. set value with 'object' itself to the batch
    batch.set(docRef, object);
  });
  // commit
  await batch.commit();
  // console log so we know its done
  console.log("done");
};

// retrieve category from firebase = get mounted shop data inffo to render on shop page
export const getCategoriesAndDocuments = async () => {
  // we can put in collectionKey "categories" because we know what the key is because we just made it from addCollectionAndDocuments
  const collectionRef = collection(db, "categories");
  // generate a query off the collectionRef to get a snapshot
  const q = query(collectionRef);

  // getDocs fetches the query snapshot
  const querySnapshot = await getDocs(q);
  // now we can access the querySnapshot to get the arrays, then to reduce it to create the structure we need
  // finaly end up an object we use.

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // destructure off the value of the data of the docSnapshot which is an object
    const { title, items } = docSnapshot.data();
    // make it as the structure we need, one big object, with title array and 9 items inside the array, item in object format becasue it has name, ide, url...
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  // this is an async funciton, so we get back a promise = categoryMap, so to use in useEffect, create another async function, see categories.context
  return categoryMap;
};

// userAuth argument is the response from log-in-ed google user using auth instance, access its uid property
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // protect the code if we dont get input
  if (!userAuth) return;

  // create docref (google automatically created a memory space for that uid if it does not exist)
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // use getDoc to access the data from the object (userDocRef)
  // use getDoc to check if the object exists in the db -> return true or false
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // use exists() we can write a logic to setDoc in the db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // try catch block
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        // add additional information from the createUserDocumentFromAuth function defined
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // if it does exist, it will skip all if block
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // protect the code if we dont get input
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // protect the code if we dont get input
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
