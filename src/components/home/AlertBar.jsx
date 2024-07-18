import { useState } from "react";
import { Link } from "react-router-dom";


export function AlertBar() {
  const [hover, setHover] = useState(false);
  const icons = {lex:"pi-star",leo:"pi-circle",loki:"pi-heart"};
  return (
    <div className="-mx-4 overflow-hidden">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="bg-alertBg text-alert border border-cardBorder shadow-cardShadow font-Geomanist -mx-12 text-center  overflow-hidden flex justify-center items-center "
      >
      </div>
    </div>
  );
}
