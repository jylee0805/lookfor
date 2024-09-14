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
} from "../utils/firebase";

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

  async uploadImage(photo: object) {
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

  async setViewPost(data: object, image: string) {
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
    const q = query(collection(db, "sections"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
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

  async getViewPosts(section: string, row: number, seat: number) {
    const q = query(collection(db, "viewPosts"), where("section", "==", section), where("row", "==", row), where("seat", "==", seat));
    const querySnapshot = await getDocs(q);
    const posts: object[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      posts.push(data);
    });
    console.log(posts);

    return posts;
  },

  async getViewComments(id: string, onUpdate: (comments: object[]) => void) {
    console.log(id);

    const q = query(collection(db, `viewPosts/${id}/comments`), orderBy("createdTime"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedComments: object[] = [];
      querySnapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      onUpdate(updatedComments);
    });
    return unsubscribe;
  },
  /*const querySnapshot = await getDocs(q);
    const comments: object[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      comments.push(doc.data());
    });*/
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
