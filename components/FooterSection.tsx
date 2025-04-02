"use client";
import { motion } from "framer-motion";

export const FooterSection = () => (
  <footer className="bg-navy-900 py-12 px-6 border-t border-gold-500/10 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gold-500/5 blur-2xl -z-0"></div>
    <div className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-gold-500/5 blur-xl -z-0"></div>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center group">
            <motion.div
              className="w-10 h-10 rounded-lg bg-gold-500 flex items-center justify-center mr-3 transition-all duration-300 group-hover:rotate-12"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-serif text-lg text-navy-900 font-bold">
                VC
              </span>
            </motion.div>
            <h3 className="font-serif text-2xl text-gold-500">
              VAConcierge
            </h3>
          </div>
          <p className="font-sans text-platinum/90 max-w-md mt-3 leading-relaxed">
            Elevating hospitality through seamless, white-labeled executive assistance.
          </p>
        </div>
        <div className="flex space-x-6">
          {[
            {
              icon: (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ),
              label: "LinkedIn",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              ),
              label: "Instagram",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 1.397c-.197.098-.561.278-.796.372-.08.036-.173.036-.248-.025-.074-.061-.173-.174-.272-.347-.099-.173-.372-.611-.446-.793-.074-.181-.074-.298-.05-.372.024-.074.074-.124.174-.198.099-.074.223-.148.322-.223.1-.074.124-.074.174-.05.05.025.099.124.149.248.05.124.223.471.272.578.05.099.099.174.025.272-.025.074-.05.061-.099.05-.05-.012-.148-.05-.248-.099zM12 0a12 12 0 00-9.5 19.32L0 24l4.68-2.5A12 12 0 1012 0zm0 22a9.94 9.94 0 01-5.33-1.55l-.38-.23-3.96 1.06 1.06-3.89-.24-.38A10 10 0 1112 22z" />
                </svg>
              ),
              label: "WhatsApp",
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href="https://wa.me/2347015990636"
              target="_blank"
              rel="noopener noreferrer"
              className="text-platinum hover:text-gold-500 transition-colors duration-300"
              whileHover={{ y: -2 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-navy-700 pt-8">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6 md:mb-0">
          {["Privacy Policy", "Terms of Service", "Contact Us"].map(
            (link, index) => (
              <motion.a
                key={index}
                href="https://wa.me/2347015990636"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-platinum/90 hover:text-gold-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {link}
              </motion.a>
            )
          )}
        </nav>
        <motion.p
          className="font-sans text-platinum/80"
          whileHover={{ scale: 1.02 }}
        >
          VAConcierge © {new Date().getFullYear()} – Powered by Excellence
        </motion.p>
      </div>
    </div>
  </footer>
);