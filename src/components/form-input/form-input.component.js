import { FormInputLabel, Input, Group } from "./form-input.styles.js";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {/* if there is no label, dont render the label */}
      {/* gives dynamic classname + second class name form-input-label*/}
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
