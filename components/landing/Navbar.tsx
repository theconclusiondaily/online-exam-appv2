"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

import { navigation } from "@/lib/landing/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-4">

            <Image
              src="/logo.png"
              alt="The Conclusion Daily"
              width={56}
              height={56}
              priority
              className="h-14 w-14 object-contain"
            />

            <div className="flex flex-col leading-tight">

              <span
                className={`text-lg font-black tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-brand" : "text-white"
                }`}
              >
                THE CONCLUSION DAILY
              </span>

              <span
                className={`text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 ${
                  scrolled ? "text-brand-gold" : "text-[#F2D27A]"
                }`}
              >
                Hope & Faith 
              </span>

            </div>

          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-10 lg:flex">

            {navigation.map((item) => (

              <Link
                key={item.title}
                href={item.href}
                className={`
                  relative
                  text-sm
                  font-semibold
                  transition
                  after:absolute
                  after:-bottom-2
                  after:left-0
                  after:h-[2px]
                  after:w-0
                  after:bg-brand-gold
                  after:transition-all
                  hover:after:w-full
                  ${
                    scrolled
                      ? "text-brand-muted hover:text-brand"
                      : "text-white/90 hover:text-brand-gold"
                  }
                `}
              >
                {item.title}
              </Link>

            ))}

          </nav>

          {/* Desktop CTA */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link
              href="https://exam.theconclusiondaily.com/login"
              className={`font-semibold transition ${
                scrolled
                  ? "text-brand hover:text-brand-gold"
                  : "text-white hover:text-brand-gold"
              }`}
            >
              Login
            </Link>

            <Link
              href="https://exam.theconclusiondaily.com/signup"
              className="
                rounded-2xl
                bg-brand
                px-6
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-brand-light
                shadow-lg
              "
            >
              Get Started
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 lg:hidden"
          >
            <Menu
              className={`h-7 w-7 ${
                scrolled ? "text-brand" : "text-white"
              }`}
            />
          </button>

        </div>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="absolute right-0 top-0 h-full w-[330px] bg-white p-8 shadow-2xl"
            >

              <div className="flex items-center justify-between">

                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/logo.png"
                    alt="The Conclusion Daily"
                    width={46}
                    height={46}
                  />

                  <div>

                    <div className="text-sm font-black text-brand">
                      THE CONCLUSION DAILY
                    </div>

                    <div className="text-[10px] uppercase tracking-[0.25em] text-brand-gold">
                      Hope & Faith 
                    </div>

                  </div>

                </Link>

                <button onClick={() => setMobileOpen(false)}>
                  <X className="h-7 w-7 text-brand" />
                </button>

              </div>

              <div className="mt-12 flex flex-col gap-5">

                {navigation.map((item) => (

                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-gray-200
                      p-4
                      font-semibold
                      text-brand
                      transition
                      hover:bg-gray-50
                    "
                  >
                    {item.title}

                    <ChevronRight size={18} />

                  </Link>

                ))}

              </div>

              <div className="mt-12 flex flex-col gap-4">

                <Link
                  href="https://exam.theconclusiondaily.com/login"
                  className="
                    rounded-2xl
                    border
                    border-brand
                    py-3
                    text-center
                    font-semibold
                    text-brand
                    transition
                    hover:bg-brand
                    hover:text-white
                  "
                >
                  Login
                </Link>

                <Link
                  href="https://exam.theconclusiondaily.com/signup"
                  className="
                    rounded-2xl
                    bg-brand
                    py-3
                    text-center
                    font-semibold
                    text-white
                    transition
                    hover:bg-brand-light
                  "
                >
                  Get Started
                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}