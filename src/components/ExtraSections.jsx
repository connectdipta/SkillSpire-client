import React from "react";
import {
  FaUserCheck,
  FaUpload,
  FaMoneyBillWave,
  FaStar,
  FaShieldAlt,
  FaGlobe,
  FaRocket,
} from "react-icons/fa";

const ExtraSections = () => {
  return (
    <>
      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20 rounded-2xl">
        <h2 className="text-4xl font-extrabold text-center text-secondary mb-14">
          🚀 How SkillSpire Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            icon={<FaUserCheck />}
            title="Join a Contest"
            text="Choose a contest that matches your skill and register securely."
          />

          <StepCard
            icon={<FaUpload />}
            title="Submit Your Work"
            text="Complete the challenge and submit before the deadline."
          />

          <StepCard
            icon={<FaMoneyBillWave />}
            title="Win & Get Rewarded"
            text="Best submissions win exciting prizes and recognition."
          />
        </div>
      </section>

      {/* ================= WHY SKILLSPIRE ================= */}
      <section className="bg-base-200 py-20 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-secondary mb-14">
            💡 Why Choose SkillSpire?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaStar />}
              title="Skill-Focused Platform"
              text="Purely skill-based contests where talent matters most."
            />

            <FeatureCard
              icon={<FaShieldAlt />}
              title="Fair & Transparent"
              text="Clear rules, honest judging, and trusted results."
            />

            <FeatureCard
              icon={<FaGlobe />}
              title="Global Exposure"
              text="Compete with participants worldwide and grow faster."
            />
          </div>
        </div>
      </section>

      {/* ================= SUCCESS & MOTIVATION ================= */}
      <section className="relative py-24 overflow-hidden rounded-2xl my-4">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-white grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              🔥 Turn Your Skills Into Success
            </h2>

            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Thousands of students and professionals are already transforming
              their creativity into recognition and rewards. SkillSpire is not
              just a contest platform — it’s a launchpad for your career.
            </p>

            <ul className="space-y-3 text-lg">
              <li>✅ Gain real-world experience</li>
              <li>✅ Build a winning portfolio</li>
              <li>✅ Earn prizes & confidence</li>
            </ul>

            <button className="mt-8 btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary rounded-full">
              Start Your Journey
            </button>
          </div>

          {/* RIGHT HIGHLIGHT BOX */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <FaRocket className="text-4xl" />
              <h3 className="text-2xl font-bold">Real Growth</h3>
            </div>

            <p className="opacity-90 leading-relaxed">
              “Participating in SkillSpire contests helped me sharpen my skills,
              gain confidence, and even win my first prize online. It pushed me
              beyond tutorials into real challenges.”
            </p>

            <p className="mt-4 font-semibold opacity-90">
              — A SkillSpire Champion
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

/* ================= REUSABLE ================= */

const StepCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-3xl p-8 shadow-xl text-center
  hover:-translate-y-2 hover:shadow-2xl transition">
    <div className="text-5xl text-primary mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-base-content/70">{text}</p>
  </div>
);

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-3xl p-8 shadow-lg text-center
  hover:shadow-2xl hover:-translate-y-2 transition">
    <div className="text-5xl text-primary mb-4 flex justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-base-content/70">{text}</p>
  </div>
);

export default ExtraSections;
