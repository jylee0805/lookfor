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
  updateDoc,
} from "../utils/firebase";
import { PostState, Comment } from "../pages/View";
import { Concerts } from "../pages/ConcertList";
import { Detail } from "../pages/Concert";
import { MerchPost } from "../pages/FansSupport";
import { Place, PlaceAvailable } from "../pages/TransportationDriving";

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

  async getViewPosts(section: string, row: number, seat: number, onUpdate: (post: PostState[]) => void) {
    const q = query(collection(db, "viewPosts"), where("section", "==", section), where("row", "==", row), where("seat", "==", seat));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: PostState[] = [];
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
      const postDoc = doc(db, "viewPosts", id);
      await deleteDoc(postDoc);
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
  async updateViewPost(id: string, data: Data, image: string) {
    try {
      const postDoc = doc(db, "viewPosts", id);
      await updateDoc(postDoc, {
        content: data.content || "",
        concert: data.concert,
        image: image,
        note: data.note || "",
        row: parseInt(data.row),
        seat: parseInt(data.seat),
        section: data.section,
      });
      console.log("Document updated with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  async updateComment(post: string, id: string, content: string) {
    try {
      const commentDoc = doc(db, `viewPosts/${post}/comments`, id);
      await updateDoc(commentDoc, {
        content: content,
      });
      console.log("Document updated with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
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
    const q = query(collection(db, "concerts"), orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);
    const data: Concerts[] = [];
    querySnapshot.forEach((doc) => {
      const concertData = { ...doc.data(), id: doc.id };
      data.push(concertData as Concerts);
    });
    console.log(data);
    return data;
  },

  async getConcertDetail(concert: string) {
    const q = query(collection(db, `concerts/${concert}/details`));
    const querySnapshot = await getDocs(q);
    let detail: Detail | null = null;
    querySnapshot.forEach((doc) => {
      detail = doc.data() as Detail;
    });
    console.log(detail);

    return detail;
  },

  async setMerchPost(merch: object) {
    await addDoc(collection(db, "merchPost"), {
      ...merch,
      createdTime: serverTimestamp(),
    });
    return;
  },

  async getMerchPost(concertId: string, onUpdate: (post: MerchPost[]) => void) {
    const q = query(collection(db, "merchPost"), where("concertId", "==", concertId), orderBy("createdTime", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: MerchPost[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as MerchPost);
      });
      console.log(data);

      onUpdate(data);
    });
    return unsubscribe;
  },
  async updateMerchPost(id: string, merch: object) {
    try {
      const postDoc = doc(db, "merchPost", id);
      await updateDoc(postDoc, merch);
      console.log("Document updated with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
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
  async getParkInfo(max: number[], min: number[]) {
    try {
      const parkInfo = await fetch("https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json");
      console.log(max, min);

      if (parkInfo.ok) {
        const data = await parkInfo.json();
        const need = data.data.park.filter((item) => {
          if (parseFloat(item.tw97x) > min[0] && parseFloat(item.tw97x) < max[0] && parseFloat(item.tw97y) > min[1] && parseFloat(item.tw97y) < max[1]) {
            return item;
          }
        });
        const result = need.map((item) => {
          return { lng: item.tw97x, lat: item.tw97y, name: item.name, parkNum: item.summary, fee: item.payex, openTime: item.serviceTime, address: item.address, placeId: item.id };
        });

        return result;
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
  async getParkAvailable(places: Place[]) {
    try {
      const park = await fetch("https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json");

      if (park.ok) {
        const data = await park.json();
        const need = data.data.park.filter((item: PlaceAvailable) => {
          return places.some((place) => place.placeId === item.id);
        });
        console.log(need);

        return need;
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
};

export default api;
