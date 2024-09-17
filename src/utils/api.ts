import {
  auth,
  createUserWithEmailAndPassword,
  db,
  addDoc,
  collection,
  signInWithEmailAndPassword,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  signOut,
  serverTimestamp,
  onSnapshot,
  orderBy,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  FirebaseError,
} from "../utils/firebase";
import { Post, Comment } from "../pages/View";

interface Data {
  content: string;
  concert: string;
  note: string;
  row: string;
  seat: string;
  section: string;
}

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

  async userLogInGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      /*const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken; */
      const user = result.user;
      return { user };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(credential);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    /*signInWithPopup(auth, provider)
      .then(async (result) => {
        // 登入成功，取得 token、user
        const credential = await GoogleAuthProvider.credentialFromResult(result);
        //let token = credential.accessToken;

        const user = result.user;
        //console.log(token);
        console.log(credential);
        return result;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(credential);
        return error.message;
      });*/
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

  async uploadImage(photo: File) {
    const storageRef = ref(storage, `images/${photo.name}`);
    const uploadTask = await uploadBytes(storageRef, photo);
    console.log(photo);

    const downloadURL = await getDownloadURL(uploadTask.ref);
    console.log(downloadURL);

    return downloadURL;
  },
  async setUser(name: string, uid: string) {
    await addDoc(collection(db, "users"), {
      userName: name,
      UID: uid,
    });
    return;
  },

  async setViewPost(data: Data, image: string) {
    await addDoc(collection(db, "viewPosts"), {
      content: data.content,
      concert: data.concert,
      image: image,
      note: data.note,
      row: parseInt(data.row),
      seat: parseInt(data.seat),
      section: data.section,
      createdTime: serverTimestamp(),
      userUID: "",
    });
    return;
  },

  async setComment(id: string, content: string) {
    await addDoc(collection(db, `viewPosts/${id}/comments`), {
      content: content,
      createdTime: serverTimestamp(),
      userUID: "",
    });
    return;
  },

  async getSections() {
    const q = query(collection(db, "sections"), orderBy("sectionName"));
    const querySnapshot = await getDocs(q);
    const section: object[] = [];
    querySnapshot.forEach((doc) => {
      section.push(doc.data());
    });

    return section;
  },

  async getRows(section: string) {
    const q = query(collection(db, "sections"), where("sectionName", "==", section));
    const querySnapshot = await getDocs(q);
    let row;
    querySnapshot.forEach((doc) => {
      row = doc.get("row");
    });
    return row;
  },

  async getViewPosts(section: string, row: number, seat: number, onUpdate: (post: Post[]) => void) {
    const q = query(collection(db, "viewPosts"), where("section", "==", section), where("row", "==", row), where("seat", "==", seat));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() });
      });
      console.log(updatedPosts);

      onUpdate(updatedPosts);
    });
    return unsubscribe;
  },

  async getViewComments(id: string, onUpdate: (comments: Comment[]) => void) {
    console.log(id);

    const q = query(collection(db, `viewPosts/${id}/comments`), orderBy("createdTime"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedComments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      console.log(updatedComments);

      onUpdate(updatedComments);
    });
    return unsubscribe;
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
