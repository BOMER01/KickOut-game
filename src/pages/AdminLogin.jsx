import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";


function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  async function handleLogin() {

    if (!email || !password) {

      alert(
        "الرجاء إدخال البريد الإلكتروني وكلمة المرور"
      );

      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      /*
       * =========================
       * FIREBASE LOGIN
       * =========================
       */

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

console.log("ADMIN AUTH UID:", user.uid);
console.log("ADMIN EMAIL:", user.email);


const userRef = doc(
  db,
  "users",
  user.uid
);

const userSnap = await getDoc(userRef);

console.log(
  "ADMIN DOCUMENT EXISTS:",
  userSnap.exists()
);

if (userSnap.exists()) {
  console.log(
    "ADMIN DOCUMENT DATA:",
    userSnap.data()
  );
}


if (
  !userSnap.exists() ||
  userSnap.data().role !== "admin"
) {

  await auth.signOut();

  alert(
    "ليس لديك صلاحية الدخول إلى لوحة التحكم"
  );

  return;
}


      /*
       * =========================
       * ADMIN SUCCESS
       * =========================
       */

      navigate("/admin");

    } catch (error) {

      console.error(
        "Admin Login Error:",
        error
      );

      alert(
        "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      );

    } finally {

      setLoading(false);

    }
  }


  return (

    <div>

      <h1>
        Admin Login
      </h1>


      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />


      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />


      <button
        onClick={handleLogin}
        disabled={loading}
      >

        {loading
          ? "جاري تسجيل الدخول..."
          : "Login"}

      </button>

    </div>

  );
}


export default AdminLogin;