import React from "react";

function InputField({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  fieldRefs,
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={(element) => {
          fieldRefs.current[id] = element;
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

export default InputField;
