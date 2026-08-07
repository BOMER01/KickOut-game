import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";

import Header from "../components/Header";
import Hero from "../components/Hero";
import HowToPlay from "../components/HowToPlay";
import ChallengeTerminal from "../components/ChallengeTerminal";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowToPlay />
      <ChallengeTerminal />
      <CTA />
      <Footer />
    </>
  );
}

