import { useState } from "react";
import FormInput from "../form-input/form-input.component.js";
import Button from "../button/button.component.js";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import "./sign-up-form.component.js";

// to avoid writing 4 useState, pass in one object as initial state value in useState
const defaultFields = {
  displayName: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const SignUpForm = () => {
  const [fields, setFields] = useState(defaultFields);
  const { displayName, email, password, confirmedPassword } = fields;

  // console.log(fields);

  const resetFormFields = () => {
    setFields(defaultFields);
  };

  // for onSubmit event handler in <form> tag
  const handleSubmit = async (event) => {
    // prevent default behavior in the <form>
    event.preventDefault();

    // check password + confirmed password match
    if (password !== confirmedPassword) return;
    // authenticate user in google authentication
    // why use try catch here??
    try {
      // user is a deconstruction of the response.
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // additional information: displayName if no displayName from userAuth
      await createUserDocumentFromAuth(user, { displayName });
      // reset form to empty after the user is created in the function
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error: ", error);
      }
    }
    // create user in db
  };

  // generalize handleChange to all form inputs (displayName, email, password, confirmedPassword)
  const handleChange = (event) => {
    {
      /* name is a property in event??????? becuase we have passed 'name' prop in <input> ? is it why? */
      /* name and value will come in thru event.target object */
    }

    const { name, value } = event.target;
    {
      /* whats the reason to spread out fields like ...fields and then bracket name [name], set it to value that one i get it though */
      /* we want to spread in the object fields and modify only one value of the object */
    }
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {/* name property is needed in input field to generalize handleChange
        method in onChange event handler */}
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmedPassword"
          onChange={handleChange}
          value={confirmedPassword}
        />
        {/* inside <Button if you say buttonType="google" or buttonType="inverted" it changes, otherwise none is default */}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
