import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const questionsRef = collection(db, "questions");

export async function getQuestions(packId) {
  const q = query(
    questionsRef,
    where("packId", "==", packId),
    where("isActive", "==", true),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addQuestion(question) {
  return await addDoc(questionsRef, question);
}

export async function deleteQuestion(id) {
  return await deleteDoc(doc(db, "questions", id));
}