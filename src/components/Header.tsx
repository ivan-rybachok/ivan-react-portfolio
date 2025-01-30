import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { Social } from "../types";

type Props = {
  socials: Social[];
  isDark: boolean;
  switchTheme: () => void;
};

function Header({ socials, isDark, switchTheme }: Props) {
  const [hideHeader, setHideHeader] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const fgColor = isDark ? "gray" : "hsl(0, 0%, 30%)";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < 10) {
        setHideHeader(false);
      } else {
        setHideHeader(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full bg-inherit z-50 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        {/* Left Section */}
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex items-center space-x-4"
        >
          {socials.map((social) => (
            <SocialIcon
              key={social._id}
              url={social.url}
              fgColor={fgColor}
              bgColor="transparent"
              className="hover:opacity-50 transition-opacity"
              target="_blank"
            />
          ))}
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{
              x: 500,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("contact")}
          >
            <SocialIcon
              network="email"
              fgColor={fgColor}
              bgColor="transparent"
              className="hover:opacity-50 transition-opacity"
            />
            <span className="uppercase hidden md:inline-flex text-sm text-gray-700 dark:text-gray-400 ml-2">
              Get In Touch
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={switchTheme}
            className="bg-[#2b2b2b] p-2 rounded-full hover:opacity-75 transition-opacity"
          >
            {isDark ? (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default Header;
