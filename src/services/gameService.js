import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

export async function consumeGame(userId) {
  const userRef = doc(db, "users", userId);

  return await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists()) {
      throw new Error("المستخدم غير موجود");
    }

    const userData = userSnap.data();
    const gamesRemaining = userData.gamesRemaining || 0;

    if (gamesRemaining <= 0) {
      throw new Error("لا توجد ألعاب متبقية");
    }

    const newGamesRemaining = gamesRemaining - 1;

    transaction.update(userRef, {
      gamesRemaining: newGamesRemaining,
    });

    return newGamesRemaining;
  });
}