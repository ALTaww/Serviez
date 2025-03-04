import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const Loader = ({ type = "classic", message = "Loading" }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots + ".");
    }, 500);
    return () => clearInterval(interval);
  }, [dots]);

  return (
    <div className="loading">
      {type === "classic" && <Icon icon="eos-icons:loading" />}
      {type === "circle-dots" && <Icon icon="eos-icons:bubble-loading" />}
      {type === "dots" && <Icon icon="eos-icons:three-dots-loading" />}
      <p>{message}...</p>
    </div>
  );
};

export default Loader;
