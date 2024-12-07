/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Upload Audio", "Record Audio"];

const VoiceTabs = ({ onTabClick }) => {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="px-4 py-14  flex items-center flex-wrap gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          onTabClick={onTabClick}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({ text, selected, setSelected, onTabClick }) => {
  return (
    <button
      onClick={() => {
        setSelected(text);
        onTabClick(text);
      }}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-700 hover:bg-slate-200"
      } text-sm transition-colors p-2 md:px-3 md:py-3 rounded-full relative`}
    >
      <span className="relative z-10 text-[15px] md:text-[18px] ">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#16A34A] to-[rgb(22,163,74,.8)] rounded-full p-4 -top-[5px] "
        ></motion.span>
      )}
    </button>
  );
};

export default VoiceTabs;
