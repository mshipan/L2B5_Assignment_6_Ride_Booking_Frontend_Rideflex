import rideImg from "@/assets/images/ride2.svg";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-primary-foreground">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-center md:gap-16">
          {/* Text Content */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-white">
              Book a ride or drive with
              <strong className="text-orange-600"> ease</strong>, anytime,
              anywhere.
            </h1>

            <p className="mt-4 text-base text-gray-700 sm:text-lg md:text-xl dark:text-gray-200">
              Join our ride-sharing platform <strong>"Rideflex"</strong> to
              quickly find rides, earn money as a driver, and enjoy safe,
              reliable, and convenient transportation every day.
            </p>

            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <Link
                className="w-full rounded border border-orange-600 bg-orange-600 px-5 py-3 text-center font-medium text-white shadow-sm transition-colors hover:bg-orange-700 sm:w-auto"
                to="/book-ride"
              >
                Book a Ride
              </Link>

              <Link
                className="w-full rounded border border-gray-200 px-5 py-3 text-center font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white sm:w-auto"
                to="/drive-with-us"
              >
                Drive with Us
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end w-full md:w-1/2">
            <img
              src={rideImg}
              alt="Ride sharing illustration"
              className="w-full max-w-md sm:max-w-lg md:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
