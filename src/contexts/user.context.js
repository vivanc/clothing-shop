import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase.utils.js";

// actual storage, set default value, actual value you want to access
export const UserContext = createContext({
  // this is for context
  currentUser: null,
  setCurrentUser: () => null,
});

// provider, the component
// the children here is whatever component that is wrapped inside <userContext> such as <App />
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // this is for state
  const value = { currentUser, setCurrentUser };

  signOutUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
