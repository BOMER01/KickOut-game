import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function AdminProtectedRoute({ children }) {

  const { currentUser } = useAuth();

  const [isAdmin, setIsAdmin] = useState(null);


  useEffect(() => {

    async function checkAdmin() {

      if (!currentUser) {
        setIsAdmin(false);
        return;
      }

      try {

        const userRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const userSnap = await getDoc(userRef);

        if (
          userSnap.exists() &&
          userSnap.data().role === "admin"
        ) {

          setIsAdmin(true);

        } else {

          setIsAdmin(false);

        }

      } catch (error) {

        console.error(
          "Admin Check Error:",
          error
        );

        setIsAdmin(false);
      }
    }

    checkAdmin();

  }, [currentUser]);


  /*
   * لا نقرر قبل انتهاء التحقق
   */

  if (isAdmin === null) {
    return null;
  }


  /*
   * غير مسجل
   */

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  /*
   * مسجل لكنه ليس Admin
   */

  if (!isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  /*
   * Admin
   */

  return children;
}

export default AdminProtectedRoute;