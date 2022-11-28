import React from "react";

const Upload = ({ label, divClass, labelClass, inputClass, inputName, onChange, error }) =>
{
  return (
    <div className={divClass}>
      <label className={labelClass}>{label}</label>
      <input
        name={inputName}
        onChange={(e) => onChange(
          {
            target:
            {
              name: e.target.name,
              value: e.target.files[0]
            }
          }
        )}
        accept="image/png,image/jpeg"
        type="file"
        className={inputClass}
      />
      {!error ? null : <span>{error}</span>}
    </div>
  );
};

export default Upload;