import firebase from "./FirebaseConfig";

const auth = firebase.auth();

const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const sendPaswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPaswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
