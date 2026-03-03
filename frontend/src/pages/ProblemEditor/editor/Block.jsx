import React from "react";

function Block({ title, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{title}</p>
      <div className="bg-[#2a2a40] rounded p-3 font-mono">{value || "-"}</div>
    </div>
  );
}

export default Block;
