import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-100 text-base-content px-4">
      
      {/* Floating blurred shapes (theme-safe) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative text-center max-w-md"
      >
        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[120px] font-extrabold text-primary drop-shadow-md"
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-2">
          Oops! Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm opacity-70 leading-relaxed">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for doesn’t exist or has been moved."}
        </p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-block mt-6 px-8 py-3 rounded-full
                       bg-primary text-secondary font-semibold
                       shadow-lg hover:shadow-xl hover:scale-105
                       transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
