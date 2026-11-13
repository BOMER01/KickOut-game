
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

// جلب الحزم المكتملة لفئة معينة لدى المستخدم
export async function getCompletedPackIds(userId, categoryId) {
  if (!userId || !categoryId) return [];

  const progressRef = doc(
    db,
    "users",
    userId,
    "categoryProgress",
    categoryId
  );

  const snapshot = await getDoc(progressRef);

  if (!snapshot.exists()) return [];

  return snapshot.data().completedPackIds || [];
}

// تسجيل حزمة كمكتملة
export async function markPacksCompleted(userId, categories) {
  if (!userId || !Array.isArray(categories)) {
    throw new Error("Invalid user or categories");
  }

  const validCategories = categories.filter(
    (category) => category.categoryId && category.packId
  );

  await Promise.all(
    validCategories.map((category) => {
      const progressRef = doc(
        db,
        "users",
        userId,
        "categoryProgress",
        category.categoryId
      );

      return setDoc(
        progressRef,
        {
          completedPackIds: arrayUnion(category.packId),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    })
  );
}
