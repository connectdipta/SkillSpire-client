import React from "react";
import Banner2 from "../components/Banner2";
import { FaTrophy, FaUsers, FaLightbulb, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Banner2 />

      {/* ================= ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-secondary mb-4">
              About SkillSpire
            </h2>
            <p className="text-base-content/70 leading-relaxed mb-4">
              SkillSpire is an innovative contest-based platform designed to
              empower learners, creators, and professionals. We believe that
              skills grow faster when challenged in real-world scenarios.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              Our platform connects talented individuals with exciting contests,
              rewarding creativity, problem-solving, and dedication through
              recognition and prizes.
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-3">What We Offer</h3>
            <ul className="space-y-3 text-base-content/70">
              <li>✔ Skill-based competitions</li>
              <li>✔ Fair judging & transparency</li>
              <li>✔ Real rewards & recognition</li>
              <li>✔ Growth-driven community</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-secondary mb-12">
            Our Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-base-100 rounded-3xl p-8 shadow-xl">
              <FaLightbulb className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-base-content/70">
                To create a competitive yet supportive environment where people
                can learn, showcase skills, and earn recognition through fair
                contests.
              </p>
            </div>

            <div className="bg-base-100 rounded-3xl p-8 shadow-xl">
              <FaRocket className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-base-content/70">
                To become the leading global platform for skill-based challenges
                that inspire growth, confidence, and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-extrabold text-center text-secondary mb-14">
          Why Choose SkillSpire?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <WhyCard
            icon={<FaUsers />}
            title="Community Driven"
            text="Join a growing community of learners, creators, and innovators."
          />

          <WhyCard
            icon={<FaTrophy />}
            title="Rewarding Excellence"
            text="We celebrate winners with prizes, recognition, and visibility."
          />

          <WhyCard
            icon={<FaRocket />}
            title="Career Growth"
            text="Build your profile, improve skills, and stand out from the crowd."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-white/90 mb-8">
            Participate in contests, sharpen your skills, and become a champion
            on SkillSpire.
          </p>

          <a
            href="/all-contests"
            className="btn bg-white text-primary text-lg px-10 rounded-full
            hover:scale-105 transition"
          >
            Explore Contests
          </a>
        </div>
      </section>
    </>
  );
};

/* ================= REUSABLE ================= */
const WhyCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-3xl p-8 shadow-xl text-center
  hover:-translate-y-2 hover:shadow-2xl transition">
    <div className="text-5xl text-primary mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-base-content/70">{text}</p>
  </div>
);

export default AboutUs;
