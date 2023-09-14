import { useState } from "react";

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

  console.log(fields);

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        {/* name property is needed in input field to generalize handleChange
        method in onChange event handler */}
        <input
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="confirmedPassword"
          onChange={handleChange}
          value={confirmedPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
