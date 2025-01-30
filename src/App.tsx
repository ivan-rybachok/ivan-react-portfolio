import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactMe from "./components/ContactMe";
import LoadingSpinner from "./components/LoadingSpinner";
import { PageInfo, Experience, Skill, Project, Social } from "./types";
import { motion, useScroll, useSpring } from "framer-motion";
import { fetchPageInfo } from "../src/utils/fetchPageInfo";
import { fetchExperiences } from "../src/utils/fetchExperiences";
import { fetchSkills } from "../src/utils/fetchSkills";
import { fetchProjects } from "../src/utils/fetchProjects";
import { fetchSocials } from "../src/utils/fetchSocials";
import { ArrowUpCircle } from "lucide-react";

function App() {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [showProgress, setShowProgress] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const pageData = await fetchPageInfo();
        const experienceData = await fetchExperiences();
        const skillsData = await fetchSkills();
        const projectsData = await fetchProjects();
        const socialsData = await fetchSocials();

        setPageInfo(pageData);
        setExperiences(experienceData);
        setSkills(skillsData);
        setProjects(projectsData);
        setSocials(socialsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowProgress(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    if (typeof window !== undefined) {
      const savedTheme = localStorage.getItem("portfolioTheme");
      const isDarkMode = savedTheme ? savedTheme === "dark" : true;
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("portfolioTheme", newMode ? "dark" : "light");
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 dark:bg-[#262626] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {showProgress && (
        <motion.div style={{ scaleX }} className="progress-bar" />
      )}

      <div className="relative home overflow-y-scroll overflow-x-hidden">
        <Header
          socials={socials}
          isDark={isDark}
          switchTheme={toggleDarkMode}
        />

        <section id="hero" className="h-screen snap-start">
          {pageInfo && <Hero pageInfo={pageInfo} />}
        </section>

        <section
          id="about"
          className="min-h-screen snap-center section-container pt-32"
        >
          {pageInfo && <About pageInfo={pageInfo} />}
        </section>

        <section
          id="projects"
          className="min-h-screen snap-start section-container pt-32"
        >
          <Projects projects={projects} />
        </section>

        <section id="experience" className="h-screen snap-center">
          <WorkExperience experiences={experiences} />
        </section>

        <section
          id="skills"
          className="min-h-screen snap-start section-container pt-32"
        >
          <Skills skills={skills} />
        </section>

        <section
          id="contact"
          className="min-h-screen snap-start section-container pt-32"
        >
          {pageInfo && <ContactMe pageInfo={pageInfo} />}
        </section>

        <div
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#262626] cursor-pointer z-[100] animate-bounce"
        >
          <ArrowUpCircle className="w-7 h-7 text-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default App;
