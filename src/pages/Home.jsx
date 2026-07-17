import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div>
      <h1>Wrestling Challenge</h1>

      {currentUser ? (
        <>
          <p>مرحباً، {currentUser.email}</p>
          <Link to="/account">
  <button>حسابي</button>
</Link>

<br />
<br />

          <Link to="/categories">
            <button>ابدأ لعبة جديدة</button>
          </Link>
          

          <br />
          <br />

          

          <button onClick={handleLogout}>تسجيل الخروج</button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button>تسجيل الدخول</button>
          </Link>

          <br />
          <br />

          <Link to="/register">
            <button>إنشاء حساب</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;