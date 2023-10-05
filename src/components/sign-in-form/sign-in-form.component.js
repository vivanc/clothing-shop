import { useState } from "react";
import FormInput from "../form-input/form-input.component.js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.js";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";

import "./sign-in-form.component.js";

const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [fields, setFields] = useState(defaultFields);
  const { email, password } = fields;

  // console.log(fields);

  const resetFormFields = () => {
    setFields(defaultFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // for onSubmit event handler in <form> tag
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Incorrect password or email");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
