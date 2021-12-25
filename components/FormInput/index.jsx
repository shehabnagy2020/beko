import React from "react";
import { CSSTransition } from "react-transition-group";

const FormInput = ({
  id,
  name,
  type,
  errorText,
  className,
  labelClassName,
  inputClassName,
  value,
  changeVlaue,
  eyeIcon,
  children,
  rows,
  required,
}) => {
  const customChange = (e) => {
    let v = e.target.value;
    if (e.target.type === "number") v = parseFloat(v);
    changeVlaue(v);
  };

  const changePassword = (e) => {
    let elem = document.getElementById(e.target.id);
    if (elem.innerText === "visibility") {
      elem.innerText = "visibility_off";
      document
        .getElementById(e.target.id.replace("_change", ""))
        .setAttribute("type", "password");
    } else {
      elem.innerText = "visibility";
      document
        .getElementById(e.target.id.replace("_change", ""))
        .setAttribute("type", "text");
    }
  };

  return (
    <div className={`flex flex-col space-y-3  ${className}`}>
      <div className="p-3 rounded-xl border flex flex-col space-y-1 bg-white">
        <CSSTransition
          classNames="fade"
          appear={true}
          exit={false}
          in={value != null && value !== ""}
          unmountOnExit={true}
          timeout={500}
        >
          <label className={`text-gray-400 capitalize ${labelClassName}`}>
            {name}
          </label>
        </CSSTransition>
        <div className="flex items-center space-x-2">
          {type === "textarea" ? (
            <textarea
              id={id}
              placeholder={name}
              name={name}
              type={type}
              className={`flex-grow outline-none ${inputClassName}`}
              value={value}
              onChange={customChange}
              rows={rows}
              required={required}
            />
          ) : (
            <input
              id={id}
              placeholder={name}
              name={name}
              type={type}
              className={`flex-grow outline-none ${inputClassName}`}
              value={value}
              onChange={customChange}
              required={required}
            />
          )}
          <CSSTransition
            classNames="fade"
            appear={true}
            exit={false}
            in={value !== "" && eyeIcon}
            unmountOnExit={true}
            timeout={500}
          >
            <button
              className="material-icons text-primary-500 outline-none flex-shrink-0"
              onClick={changePassword}
              id="password_change"
              type="button"
            >
              visibility_off
            </button>
          </CSSTransition>
        </div>
      </div>
      {errorText !== null ||
        (errorText !== undefined && (
          <span className="text-red text-sm px-3">{errorText}</span>
        ))}
    </div>
  );
};

export default FormInput;
