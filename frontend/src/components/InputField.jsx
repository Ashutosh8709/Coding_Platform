import React, { useState } from "react";

function InputField({ label, type, value, setFormData, placeholder }) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type={type}
        name={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-300
          ${focused ? "border-brand-500 ring-2 ring-brand-500/15" : "border-gray-200 dark:border-dark-500"}`}
      />
    </div>
  );
}

export default InputField;
