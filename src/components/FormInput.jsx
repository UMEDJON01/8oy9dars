import React from "react";

function FormInput({ label, type, name, placeholder, size, inputRef }) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text font-medium">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered w-full max-w-xs ${size}`}
        ref={inputRef}
      />
    </label>
  );
}

export default FormInput;
