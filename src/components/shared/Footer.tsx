import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-2xl md:text-4xl font-bold ml-3 text-orange-500">
              Rideflex
            </span>
          </Link>

          <ul className=" flex justify-start gap-6 sm:mt-0 sm:justify-end">
            {/* Social links */}
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8 lg:grid-cols-4 lg:pt-16 dark:border-gray-800">
          {/* Ride Services */}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Ride Services
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/book-ride"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link
                  to="/ride-history"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Ride History
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Fare & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Company</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/drivers"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Support</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/help-center"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Legal</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/driver-terms"
                  className="text-orange-700 transition hover:opacity-75 dark:text-orange-500"
                >
                  Driver Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
            &copy; 2025 Rideflex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
