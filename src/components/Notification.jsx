import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("result") === "deleted") {
   
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500">
      {message}
    </div>
  );
};

export default Notification;
