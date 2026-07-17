import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!userData) {
    return <h2>جاري تحميل البيانات...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>حسابي</h1>

      <p>
        <strong>الاسم:</strong> {userData.name}
      </p>

      <p>
        <strong>البريد:</strong> {userData.email}
      </p>

      <p>
        <strong>الألعاب المتبقية:</strong> {userData.gamesRemaining}
      </p>

      <button onClick={handleLogout}>
        تسجيل الخروج
      </button>
    </div>
  );
}

export default MyAccount;
