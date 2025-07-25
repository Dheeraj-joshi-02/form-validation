import React, { useState } from "react";
import "./form.css";

const Form = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = user;

    const validations = [
      {
        condition:
          !name.trim() || !email.trim() || !password || !confirmPassword,
        message: "All fields are required",
      },
      {
        condition: password !== confirmPassword,
        message: "Passwords do not match",
      },
      {
        condition: password.length < 8,
        message: "Password must be at least 8 characters",
      },
      {
        condition: password.includes(" "),
        message: "Password cannot contain spaces",
      },
      {
        condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email address",
      },
      {
        condition:
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
          ),
        message:
          "Password must include uppercase, lowercase, number, and special character",
      },
    ];

    for (let v of validations) {
      if (v.condition) {
        setError(v.message);
        setSuccess(false);
        return;
      }
    }

    // If valid
    console.log("Submitted User:", user);
    setSuccess(true);
    setError("");
    setUser(initialState);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const renderInput = (id, type, placeholder) => (
    <div className="input-group">
      <label htmlFor={id}>
        {id
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={user[id] || ""}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-header">
          <h1>Create an account</h1>
          <p>Enter your email below to create your account</p>
        </div>

        <div className="social">
          <button type="button" aria-label="Sign up with GitHub">
            <i className="ri-github-fill"></i> GitHub
          </button>
          <button type="button" aria-label="Sign up with Google">
            <i className="ri-google-fill"></i> Google
          </button>
        </div>

        <div className="partition">
          <h6>Or continue with</h6>
        </div>

        {renderInput("name", "text", "John Doe")}
        {renderInput("email", "email", "johndoe@gmail.com")}
        {renderInput("password", "password", "Enter password")}
        {renderInput("confirmPassword", "password", "Confirm password")}

        <div className="error">
          {error && (
            <p>
              <i className="ri-error-warning-fill"></i> {error}
            </p>
          )}
          {success && (
            <p className="success">
              <i className="ri-check-line"></i> Your password is strong so form is submitted successfully.
            </p>
          )}
        </div>

        <button type="submit" className="manual-btn">
          Create an account
        </button>

        <div className="form-footer">
          <p>
            By registering, you agree to our{" "}
            <span>Terms and Conditions</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </form>
    </div>
  );
};

function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
