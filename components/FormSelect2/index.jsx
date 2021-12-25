import React, { useState } from "react";

const FormSelect2 = ({
  name,
  errorText,
  className,
  labelClassName,
  inputClassName,
  value,
  changeVlaue,
  selectable,
  valueAsId,
  firstValue,
}) => {
  const customChange = (e) => {
    changeVlaue(e.target.value);
  };
  return (
    <div className={`flex flex-col w-full border rounded-lg p-3 ${className}`}>
      {name && value && (
        <span
          className={`text-gray-500 font-normal text-sm capitalize mb-2 ${labelClassName}`}
        >
          {name}
        </span>
      )}
      <select className="" value={value} onChange={customChange}>
        <option value="">{name}</option>

        {valueAsId
          ? selectable?.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))
          : selectable.map((v) => (
              <option key={v.value} value={v.value}>
                {v.name}
              </option>
            ))}
      </select>

      {errorText !== null && errorText !== "" && (
        <span className={`text-sm text-red font-normal`}>{errorText}</span>
      )}
    </div>
  );
};

export default FormSelect2;
