import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>

      <div className="relative bg-base-200/80 backdrop-blur border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center gap-5">
            {/* Logo */}
            <Link to="/">
                    <Logo />
            </Link>

            {/* Tagline */}
            <p className="text-sm md:text-base max-w-2xl opacity-80 leading-relaxed">
              SkillSpire is a modern contest creation platform where creativity,
              innovation, and competition come together. Create contests,
              participate, win rewards, and showcase your talent to the world.
            </p>

            {/* Divider */}
            <div className="w-24 h-[2px] bg-primary rounded-full"></div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center
                           bg-base-100 shadow hover:shadow-md hover:bg-primary
                           hover:text-secondary transition-all duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center
                           bg-base-100 shadow hover:shadow-md hover:bg-primary
                           hover:text-secondary transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
          © 2025 <span className="font-semibold">SkillSpire</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
