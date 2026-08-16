import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      alert("الرجاء تعبئة جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    try {
      await registerUser(
        cleanName,
        cleanEmail,
        password
      );

      alert("تم إنشاء الحساب بنجاح 🎉");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        alert("هذا البريد الإلكتروني مستخدم بالفعل");
      } else if (error.code === "auth/invalid-email") {
        alert("البريد الإلكتروني غير صحيح");
      } else if (error.code === "auth/weak-password") {
        alert("كلمة المرور ضعيفة");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-page" dir="rtl">

      <div className="auth-card register-card">

        <div className="auth-header">
          <h1>أنشئ حساب جديد</h1>

          <p>
            أنشئ حسابك وابدأ المنافسة.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >

          {/* Name */}
          <div className="auth-field">
            <label>اسم اللاعب</label>

            <div className="auth-input-wrapper">

              <input
                type="text"
                placeholder="اسمك"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <span className="auth-input-icon">
                👤
              </span>

            </div>
          </div>

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "◉" : "◌"}
              </button>

              <span className="auth-input-icon">
                🔒
              </span>

            </div>
          </div>

          {/* Confirm Password */}
          <div className="auth-field">
            <label>تأكيد كلمة المرور</label>

            <div className="auth-input-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? "◉" : "◌"}
              </button>

              <span className="auth-input-icon">
                🔒
              </span>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-submit"
          >
            <span>←</span>
            إنشاء الحساب
          </button>

        </form>

        {/* Login */}
        <div className="auth-switch">

          <span>لديك حساب بالفعل؟</span>

          <Link to="/login">
            تسجيل الدخول
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;