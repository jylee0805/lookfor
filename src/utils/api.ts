import { auth, createUserWithEmailAndPassword, db, addDoc, collection, signInWithEmailAndPassword, query, where, getDocs, onAuthStateChanged, signOut } from "../utils/firebase";

const api = {
  async findUser(name: string) {
    const q = query(collection(db, "users"), where("userName", "==", name));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    return querySnapshot.docs;
  },

  async userSignUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        console.error("Unexpected error:", error);
        return "An unexpected error occurred.";
      }
    }
  },

  async userLogIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        console.error("Unexpected error:", error);
        return "An unexpected error occurred.";
      }
    }
  },

  userLogOut() {
    signOut(auth)
      .then(() => {
        console.log("登出成功");

        return "登出成功";
      })
      .catch((error) => {
        return error;
      });
  },

  getLoginState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  },

  async setUser(name: string, uid: string) {
    await addDoc(collection(db, "users"), {
      userName: name,
      UID: uid,
    });
    return;
  },

  async getSections() {
    const q = query(collection(db, "sections"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
  },

  async getRows(section: string) {
    const q = query(collection(db, "sections"), where("sectionName", "==", section));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const row = doc.get("row");
      console.log(row);
    });
    console.log(querySnapshot);
  },

  async getViewPosts(section: string, row: string, seat: string) {
    const q = query(collection(db, "viewPosts"), where("section", "==", section), where("row", "==", row), where("seat", "==", seat));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
    console.log(querySnapshot);
  },

  async getConcerts() {
    const q = query(collection(db, "concerts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
    console.log(querySnapshot);
  },

  async getMerchPost(concertId: string) {
    const q = query(collection(db, "merchPost"), where("concertId", "==", concertId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
    console.log(querySnapshot);
  },
};

export default api;
