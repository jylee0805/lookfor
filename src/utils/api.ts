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
  getDoc,
  arrayUnion,
  documentId,
  limit,
  startAfter,
  Timestamp,
  DocumentSnapshot,
} from "../utils/firebase";
import { Notify, OriginView, Comment, MerchPost, Personal, Concerts, Detail, PlaceInfo, PlaceAvailable } from "../types";

interface Data {
  content: string;
  concert: string;
  note: string;
  row: string;
  seat: string;
  section: string;
}

interface ParkData {
  name: string;
  summary: string;
  tw97x: string;
  tw97y: string;
  payex: string;
  serviceTime: string;
  address: string;
  id: string;
}
const api = {
  async findUser(name: string) {
    const q = query(collection(db, "users"), where("userName", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  },
  async findUserUid(uid: string) {
    const q = query(collection(db, "users"), where("UID", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  },
  async getUsers() {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const list: Personal[] = [];
    querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() } as Personal));
    return list;
  },
  async getUser(id: string) {
    const q = query(collection(db, "users"), where("UID", "==", id));
    const querySnapshot = await getDocs(q);
    const list: Personal = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Personal;
    return list;
  },

  async setNotify(postId: string, concertId: string, state: string, item: string) {
    const q = query(collection(db, "users"), where("keepIds", "array-contains", postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      console.log(doc.data());
      const notifyRef = collection(db, "users", doc.id, "notify");
      await addDoc(notifyRef, {
        title: `${item}的發放資訊已更新`,
        message: `${state}`,
        createdTime: serverTimestamp(),
        isRead: false,
        postId: postId,
        concertId: concertId,
      });
    });
  },

  async getNotify(userId: string, onUpdate: (notify: Notify[]) => void) {
    const id = await this.getUser(userId);
    const q = query(collection(db, `users/${id.id}/notify`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifyList: Notify[] = [];
      querySnapshot.forEach((doc) => {
        notifyList.push({ ...doc.data(), id: doc.id } as Notify);
      });
      console.log(notifyList);

      onUpdate(notifyList);
    });
    return unsubscribe;
  },

  async deleteNotify(id: string, notifyId: string) {
    try {
      const notifyDoc = doc(db, "users", id, "notify", notifyId);
      await deleteDoc(notifyDoc);
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },

  async updateUser(id: string, update: object) {
    try {
      const postDoc = doc(db, "users", id);
      await updateDoc(postDoc, update);
      console.log("Document updated with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
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
      const user = result.user;
      const data = await this.findUserUid(user.uid);
      if (data.length === 0) {
        this.setUser(user.displayName as string, user.uid, user.photoURL as string);
      }
      return user.uid;
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

  async userLogOut() {
    try {
      await signOut(auth);
      return auth.currentUser;
    } catch (error) {
      console.error("登出失败", error);
      return error;
    }
  },

  async getLoginState() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, () => {
        resolve(auth.currentUser?.uid); // 轉換為 boolean
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
  async setUser(name: string, uid: string, avatar: string) {
    await addDoc(collection(db, "users"), {
      userName: name,
      UID: uid,
      avatar: avatar,
    });
    return;
  },

  async getKeepPost(uid: string) {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("UID", "==", uid));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].data());
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  },

  async setKeepPost(uid: string, keepId: string) {
    console.log(uid);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("UID", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        await updateDoc(docSnapshot.ref, {
          keepIds: arrayUnion(keepId),
        });
      });

      if (querySnapshot.empty) {
        console.log("No matching documents.");
      } else {
        console.log("KeepId added to user's keepIds array");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
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

  async getUserViewPosts(uid: string) {
    const q = query(collection(db, "viewPosts"), where("userUID", "==", uid));

    const querySnapshot = await getDocs(q);
    const list: OriginView[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as OriginView);
    });

    return list;
  },

  async getViewPosts(section: string, row: number, seat: number, onUpdate: (post: OriginView[]) => void) {
    const q = query(collection(db, "viewPosts"), where("section", "==", section), where("row", "==", row), where("seat", "==", seat));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: OriginView[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() } as OriginView);
      });
      console.log(updatedPosts);

      onUpdate(updatedPosts);
    });
    return unsubscribe;
  },
  async getNewestViewPosts(onUpdate: (post: OriginView[]) => void) {
    const q = query(collection(db, "viewPosts"), orderBy("createdTime", "asc"), limit(6));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: OriginView[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() } as OriginView);
      });
      console.log(updatedPosts);

      onUpdate(updatedPosts);
    });
    return unsubscribe;
  },
  async getAllSectionViewPost(onUpdate: (post: OriginView[]) => void) {
    const q = query(collection(db, "viewPosts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: OriginView[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() } as OriginView);
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
        updatedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });

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

  async getNextConcerts(lastDoc: DocumentSnapshot | null) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);
    let q;
    if (lastDoc) {
      q = query(collection(db, "concerts"), orderBy("date", "asc"), where("endDay", ">=", todayTimestamp), limit(10), startAfter(lastDoc));
    } else {
      q = query(collection(db, "concerts"), orderBy("date", "asc"), where("endDay", ">=", todayTimestamp), limit(10));
    }
    const querySnapshot = await getDocs(q);
    const data: Concerts[] = [];

    querySnapshot.forEach((doc) => {
      const concertData = { ...doc.data(), id: doc.id };
      data.push(concertData as Concerts);
    });

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    console.log(data);
    return { data, lastVisibleDoc };
  },

  async getConcert(id: string) {
    const q = doc(db, "concerts", `${id}`);
    const querySnapshot = await getDoc(q);
    const data = { ...querySnapshot.data(), id: querySnapshot.id } as Concerts;
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

  async getUserMerchPosts(uid: string) {
    const q = query(collection(db, "merchPost"), where("userUID", "==", uid));

    const querySnapshot = await getDocs(q);
    const list: MerchPost[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as MerchPost);
    });

    return list;
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

      onUpdate(data);
    });
    return unsubscribe;
  },
  async getKeepMerchPost(idArray: string[]) {
    const q = query(collection(db, "merchPost"), where(documentId(), "in", idArray));
    const querySnapshot = await getDocs(q);
    const list: MerchPost[] = [];

    for (const doc of querySnapshot.docs) {
      const concertName = await this.getConcert(doc.data().concertId);

      list.push({ ...doc.data(), id: doc.id, concertName: concertName?.concertName } as MerchPost);
    }

    return list;
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
        const need = data.data.park.filter((item: ParkData) => {
          if (parseFloat(item.tw97x) > min[0] && parseFloat(item.tw97x) < max[0] && parseFloat(item.tw97y) > min[1] && parseFloat(item.tw97y) < max[1]) {
            return item;
          }
        });
        const result = need.map((item: ParkData) => {
          return { lng: item.tw97x, lat: item.tw97y, name: item.name, parkNum: item.summary, fee: item.payex, openTime: item.serviceTime, address: item.address, placeId: item.id };
        });

        return result;
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  },
  async getParkAvailable(places: PlaceInfo[]) {
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
