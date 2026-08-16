import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      await loginUser(cleanEmail, password);

      alert("تم تسجيل الدخول بنجاح ✅");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else if (error.code === "auth/invalid-email") {
        alert("البريد الإلكتروني غير صحيح");
      } else if (error.code === "auth/user-not-found") {
        alert("لا يوجد حساب بهذا البريد الإلكتروني");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-page" dir="rtl">
      <div className="auth-card">

        <div className="auth-header">
          <h1>جاهز لدخول الحلبة؟</h1>

          <p>
            سجل دخولك وابدأ التحدي.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>

          {/* Email */}
          <div className="auth-field">
            <label>البريد الإلكتروني</label>

            <div className="auth-input-wrapper">

              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <span className="auth-input-icon">
                ✉
              </span>

            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label>كلمة المرور</label>

            <div className="auth-input-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "◉" : "◌"}
              </button>

              <span className="auth-input-icon">
                🔒
              </span>

            </div>
          </div>

          {/* Options */}
          <div className="auth-options">

            <label className="remember-me">
              <input type="checkbox" />
              <span>تذكرني</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert("ميزة استعادة كلمة المرور سنضيفها لاحقًا")
              }
            >
              نسيت كلمة المرور؟
            </button>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
          >
            <span>←</span>
            ادخل الحلبة
          </button>

        </form>

        {/* Register */}
        <div className="auth-switch">

          <span>ما عندك حساب؟</span>

          <Link to="/register">
            أنشئ حساب جديد
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;