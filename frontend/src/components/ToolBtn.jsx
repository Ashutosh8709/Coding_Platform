import React from "react";

function ToolBtn({ title, children, onClick }) {
  return (
    <button
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="w-7 h-7 rounded flex items-center justify-center text-xs text-gray-400 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-600 hover:text-gray-700 dark:hover:text-white transition-all"
    >
      {children}
    </button>
  );
}

export default ToolBtn;
