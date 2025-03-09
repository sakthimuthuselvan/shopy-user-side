import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFoundPage = () => {
  return (
    <div className="px-3 d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Animated 404 Text */}
      <motion.h1
        className="fw-bold text-black"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{ fontSize: "8rem", textShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        404
      </motion.h1>

      {/* Error Message */}
      <motion.p
        className="fs-5 text-secondary mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Link to="/" className="btn btn-dark mt-4 px-4 py-2">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
