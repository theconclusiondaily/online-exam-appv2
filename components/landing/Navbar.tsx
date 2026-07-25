"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

import { navigation } from "@/lib/landing/navigation";
import { COMPANY } from "@/lib/landing/constants";

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
        className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-500
        ${
          scrolled
            ? "backdrop-blur-2xl bg-white/80 border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }
      `}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white font-black text-lg transition-transform duration-300 group-hover:rotate-6">
              T
            </div>

            <div className="hidden sm:block">
              <p className="font-black tracking-wide text-brand">
                {COMPANY.shortName}
              </p>

              <p className="text-xs text-brand-muted">
                {COMPANY.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop */}

          <nav className="hidden lg:flex items-center gap-10">

            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="
                relative
                text-sm
                font-semibold
                text-brand-muted
                transition
                hover:text-brand
                after:absolute
                after:-bottom-2
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-brand-gold
                after:transition-all
                hover:after:w-full
                "
              >
                {item.title}
              </Link>
            ))}

          </nav>

          {/* Desktop CTA */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              href="/login"
              className="font-semibold text-brand hover:text-brand-gold transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
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
            "
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden rounded-xl p-2"
          >
            <Menu className="h-7 w-7 text-brand" />
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
              transition={{ duration: .35 }}
              className="
              absolute
              right-0
              top-0
              h-full
              w-[330px]
              bg-white
              shadow-2xl
              p-8
              "
            >
              <div className="flex items-center justify-between">

                <h2 className="text-xl font-black text-brand">
                  {COMPANY.shortName}
                </h2>

                <button
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-7 w-7 text-brand" />
                </button>

              </div>

              <div className="mt-12 flex flex-col gap-6">

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
                  href="/login"
                  className="
                  rounded-2xl
                  border
                  border-brand
                  py-3
                  text-center
                  font-semibold
                  text-brand
                  "
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="
                  rounded-2xl
                  bg-brand
                  py-3
                  text-center
                  font-semibold
                  text-white
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