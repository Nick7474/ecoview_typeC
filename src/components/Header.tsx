/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Search, User, Globe, X } from "lucide-react";
import { NAV_LINKS } from "../constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isScrolled ? "bg-white shadow-sm" : "bg-transparent";
  const textColor = isScrolled ? "text-gray-900" : "text-white";
  const logoColor = isScrolled ? "text-blue-600" : "text-white";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-expo ${headerBg}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isScrolled ? "bg-blue-600" : "bg-white"}`}>
            <span className={`font-bold text-lg md:text-xl transition-colors duration-500 ${isScrolled ? "text-white" : "text-blue-600"}`}>E</span>
          </div>
          <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500 ${logoColor}`}>ECOVIEW</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[17px] font-semibold transition-colors duration-500 hover:text-blue-500 ${textColor}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className={`p-2 rounded-full transition-colors duration-500 hover:bg-gray-100/10 ${textColor}`}>
            <Search size={22} />
          </button>
          <button className={`hidden md:block p-2 rounded-full transition-colors duration-500 hover:bg-gray-100/10 ${textColor}`}>
            <User size={22} />
          </button>
          <button className={`hidden md:block p-2 rounded-full transition-colors duration-500 hover:bg-gray-100/10 ${textColor}`}>
            <Globe size={22} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`p-2 rounded-full transition-colors duration-500 hover:bg-gray-100/10 ${textColor}`}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile/Full Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col"
          >
            <div className="h-24 flex items-center justify-between px-12 border-b border-gray-100">
              <span className="text-2xl font-black tracking-tighter text-blue-600">ECOVIEW</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl md:text-6xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
