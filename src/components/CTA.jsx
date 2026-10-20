export default function CTA() {
  return (
    <section className="main-event" id="contact">

      {/* Wrestling Ring Ropes */}
      <div
        className="ropes ropes--back"
        data-depth="rope-back"
        aria-hidden="true"
      >
        <span className="rope rope--blue rope--b1"></span>
        <span className="rope rope--red rope--b2"></span>
      </div>

      <div
        className="ropes ropes--front"
        data-depth="rope-front"
        aria-hidden="true"
      >
        <span className="rope rope--red rope--f1"></span>
        <span className="rope rope--blue rope--f2"></span>
      </div>

      {/* Glow */}
      <div className="cta__glow"></div>

      <div className="container">

        <div className="cta__content">

          <span className="cta__label">
            ★ الحدث الرئيسي ★
          </span>

          

          <p>
            اختبر معلوماتك في أكثر من 300 سؤال،
            واجمع النقاط،
            وتحدَّ أصدقاءك لتثبت أنك ملك عالم المصارعه
          </p>

          <div className="cta__buttons">
            

            {/*<a
            to="/categories" 
               
              className="cta__button cta__button--primary"
            >
             اضغط للبدء
             
             
            </a>*/}

            <a
              href="#contact"
              className="cta__button cta__button--secondary"
            >
              تواصل معنا
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}