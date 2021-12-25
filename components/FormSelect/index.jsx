import React, { useState } from "react";

const FormSelect = ({
  id,
  placeholder,
  name,
  type,
  errorText,
  className,
  labelClassName,
  inputClassName,
  value,
  changeValue,
  selectable,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {open && (
        <div
          className="fixed w-screen h-screen top-0 left-0"
          onClick={(_) => setOpen(false)}
        ></div>
      )}
      {name && (
        <span
          className={`text-gray-500 font-normal text-sm capitalize mb-4 ${labelClassName}`}
        >
          {name}
        </span>
      )}
      <div className="relative w-full">
        <button
          type="button"
          className={`w-full p-3 text-gray-500 rounded-lg capitalize flex items-center justify-between border ${inputClassName}`}
          onClick={(_) => setOpen((o) => !o)}
        >
          <span className="">{value}</span>
          <span className="material-icons">keyboard_arrow_down</span>
        </button>
        <ul
          className={`absolute list-none flex flex-col w-full left-0 rounded-lg border shadow bg-white ${
            open ? "opacity-100 z-10" : "opacity-0 -z-1"
          }`}
          style={{ top: "100%" }}
        >
          {selectable?.map((v, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full hover:bg-gray-100 p-3 text-right text-gray-500 rounded-lg outline-none capitalize"
                onClick={(_) => {
                  changeValue(v.value);
                  setOpen(false);
                }}
              >
                {v.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {errorText !== null && errorText !== "" && (
        <span className={`text-sm text-red font-normal`}>{errorText}</span>
      )}
    </div>
  );
};

export default FormSelect;
