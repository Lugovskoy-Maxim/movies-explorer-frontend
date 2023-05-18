import React from 'react';
import './InputField.css';

function InputField({
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
}) {
  const lineColorEffect = (isValid) => {
    if (isValid === null) {
      return `input__line`;
    } else if (isValid) {
      return `input__line input__line-valid`;
    } else {
      return `input__line input__line-error`;
    }
  };

  return (
    <>
      <p className={`input__lable`}>{placeholder}</p>
      <label htmlFor={type}></label>
      <input
        className={`input__input`}
        placeholder={placeholder}
        required
        id={type}
        autoComplete="off"
        name={type}
        type={type}
        value={value}
        onChange={onChange}
      />
      <hr className={lineColorEffect(isValid)} />
      <p
        className={`input__field-error ${
          isValid ? '' : `input__field-error-active`
        }`}
        id={`${type}-error`}
      >
        {errorMessage}
      </p>
    </>
  );
}

export default InputField;
