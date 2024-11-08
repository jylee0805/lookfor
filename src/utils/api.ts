import { Comment, Concerts, Detail, MerchPost, Notify, OriginView, Personal, PlaceAvailable, PlaceInfo } from "../types";
import {
  addDoc,
  arrayUnion,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteDoc,
  doc,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getDownloadURL,
  limit,
  onAuthStateChanged,
  onSnapshot,
  orderBy,
  provider,
  query,
  ref,
  serverTimestamp,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  startAfter,
  storage,
  Timestamp,
  updateDoc,
  uploadBytes,
  where,
} from "../utils/firebase";

type Data = {
  content: string;
  concert: string;
  note: string;
  row: string;
  seat: string;
  section: string;
};

type ParkData = {
  name: string;
  summary: string;
  tw97x: string;
  tw97y: string;
  payex: string;
  serviceTime: string;
  address: string;
  id: string;
};
const api = {
  async userSignUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
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
        return "An unexpected error occurred.";
      }
    }
  },

  async userLogInGoogle() {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const data = await this.findUserUid(user.uid);
    if (data.length === 0) {
      this.setUser(user.displayName as string, user.uid, user.photoURL as string);
    }
    return user.uid;
  },

  async userLogOut() {
    await signOut(auth);
  },

  async getLoginState() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, () => {
        resolve(auth.currentUser?.uid);
      });
    });
  },

  async setUser(name: string, uid: string, avatar: string) {
    await addDoc(collection(db, "users"), {
      userName: name,
      UID: uid,
      avatar: avatar,
    });
    return;
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

  async updateUser(id: string, update: object) {
    const postDoc = doc(db, "users", id);
    await updateDoc(postDoc, update);
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

  async uploadImage(folder: string, photo: File) {
    const storageRef = ref(storage, `${folder}/${photo.name}`);
    const uploadTask = await uploadBytes(storageRef, photo);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
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

  async getAllSectionViewPost(onUpdate: (post: OriginView[]) => void) {
    const q = query(collection(db, "viewPosts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: OriginView[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() } as OriginView);
      });
      onUpdate(updatedPosts);
    });
    return unsubscribe;
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

  async getNewestViewPosts(onUpdate: (post: OriginView[]) => void) {
    const q = query(collection(db, "viewPosts"), orderBy("createdTime", "asc"), limit(6));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedPosts: OriginView[] = [];
      querySnapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() } as OriginView);
      });

      onUpdate(updatedPosts);
    });
    return unsubscribe;
  },

  async deleteViewPost(id: string) {
    const postDoc = doc(db, "viewPosts", id);
    await deleteDoc(postDoc);
  },

  async updateViewPost(id: string, data: Data, image: string) {
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
  },

  async updateComment(post: string, id: string, content: string) {
    const commentDoc = doc(db, `viewPosts/${post}/comments`, id);
    await updateDoc(commentDoc, {
      content: content,
    });
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
    const CommentDoc = doc(db, `viewPosts/${post}/comments`, id);
    await deleteDoc(CommentDoc);
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

    return { data, lastVisibleDoc };
  },

  async getConcert(id: string) {
    const q = doc(db, "concerts", `${id}`);
    const querySnapshot = await getDoc(q);
    const data = { ...querySnapshot.data(), id: querySnapshot.id } as Concerts;
    return data;
  },

  async getConcertDetail(concert: string) {
    const q = query(collection(db, `concerts/${concert}/details`));
    const querySnapshot = await getDocs(q);
    let detail: Detail | null = null;
    querySnapshot.forEach((doc) => {
      detail = doc.data() as Detail;
    });
    return detail;
  },

  async setMerchPost(merch: object) {
    await addDoc(collection(db, "merchPost"), {
      ...merch,
      createdTime: serverTimestamp(),
    });
    return;
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

  async setKeepPost(uid: string, keepId: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("UID", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await updateDoc(docSnapshot.ref, {
        keepIds: arrayUnion(keepId),
      });
    });
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
    const postDoc = doc(db, "merchPost", id);
    await updateDoc(postDoc, merch);
  },
  async deleteMerchPost(id: string) {
    const MerchPostDoc = doc(db, "merchPost", id);
    await deleteDoc(MerchPostDoc);
  },

  async setNotify(postId: string, concertId: string, state: string, item: string) {
    const q = query(collection(db, "users"), where("keepIds", "array-contains", postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
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

      onUpdate(notifyList);
    });
    return unsubscribe;
  },

  async deleteNotify(id: string, notifyId: string) {
    const notifyDoc = doc(db, "users", id, "notify", notifyId);
    await deleteDoc(notifyDoc);
  },

  async getParkInfo(max: number[], min: number[]) {
    const parkInfo = await fetch("https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json");

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
  },

  async getParkAvailable(places: PlaceInfo[]) {
    const park = await fetch("https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json");

    if (park.ok) {
      const data = await park.json();
      const need = data.data.park.filter((item: PlaceAvailable) => {
        return places.some((place) => place.placeId === item.id);
      });

      return need;
    }
  },
};

export default api;
