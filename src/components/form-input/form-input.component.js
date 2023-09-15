import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* if there is no label, dont render the label */}
      {/* gives dynamic classname + second class name form-input-label*/}
      <label
        className={`${
          otherProps.value.length > 0 ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
