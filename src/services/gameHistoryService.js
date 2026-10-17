
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

// حفظ مباراة جديدة
export async function saveGameHistory(userId, gameData) {
  if (!userId) {
    throw new Error("يجب تسجيل الدخول لحفظ المباراة");
  }

  const winner =
    gameData.scoreTeamOne > gameData.scoreTeamTwo
      ? gameData.teamOne
      : gameData.scoreTeamTwo > gameData.scoreTeamOne
      ? gameData.teamTwo
      : "تعادل";

  const gameRecord = {
    userId,
    gameName: gameData.gameName || "KICKOUT",
    teamOne: gameData.teamOne,
    teamTwo: gameData.teamTwo,
    scoreTeamOne: gameData.scoreTeamOne,
    scoreTeamTwo: gameData.scoreTeamTwo,
    winner,
    playedAt: serverTimestamp(),
  };

  return await addDoc(
    collection(db, "gameHistory"),
    gameRecord
  );
}

// جلب مباريات مستخدم محدد
export async function getUserGameHistory(userId) {
  if (!userId) {
    throw new Error("يجب تسجيل الدخول لعرض السجل");
  }

  const historyQuery = query(
    collection(db, "gameHistory"),
    where("userId", "==", userId),
    orderBy("playedAt", "desc")
  );

  const snapshot = await getDocs(historyQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}
