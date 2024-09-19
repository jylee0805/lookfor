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
  deleteDoc,
  doc,
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

    return querySnapshot.docs;
  },
  async getUser(id: string) {
    if (id) {
      const q = query(collection(db, "users"), where("UID", "==", id));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs[0].data().userName;
    }
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

  async getLoginState() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        console.log(user);

        resolve(user?.uid); // 轉換為 boolean
      });
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

  async setViewPost(data: Data, image: string, uid: string) {
    if (uid) {
      await addDoc(collection(db, "viewPosts"), {
        content: data.content || "",
        concert: data.concert,
        image: image,
        note: data.note || "",
        row: parseInt(data.row),
        seat: parseInt(data.seat),
        section: data.section,
        createdTime: serverTimestamp(),

        userUID: uid,
      });
    }
    return;
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

  async deleteViewPost(id: string) {
    try {
      const PostDoc = doc(db, "viewPosts", id);
      await deleteDoc(PostDoc);
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },

  async setComment(id: string, content: string, uid: string, userName: string) {
    await addDoc(collection(db, `viewPosts/${id}/comments`), {
      content: content,
      createdTime: serverTimestamp(),
      userUID: uid,
      userName: userName,
    });
    return;
  },

  async getViewComments(id: string, onUpdate: (comments: Comment[]) => void) {
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

  async deleteComment(post: string, id: string) {
    try {
      const CommentDoc = doc(db, `viewPosts/${post}/comments`, id);
      await deleteDoc(CommentDoc);
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
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

  async getConcerts() {
    const q = query(collection(db, "concerts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
    console.log(querySnapshot);
  },

  async getConcertDetail() {
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

  async deleteMerchPost(id: string) {
    try {
      const MerchPostDoc = doc(db, "merchPost", id);
      await deleteDoc(MerchPostDoc);
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
};

export default api;
