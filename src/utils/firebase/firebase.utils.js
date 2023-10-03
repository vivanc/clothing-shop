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
// use collectionKey to identify which collection in firebase to add to, objectsToAdd is just the shop-data.js
// because we are writing it to external source, we use sync
// transaction concept.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

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
