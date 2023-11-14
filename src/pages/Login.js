import React, { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();

  const handleValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
    } else {
      setemailError("");
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must be at least 8 characters and at most 22 characters"
      );
    } else {
      setpasswordError("");
    }

    return formIsValid;
  };

  const axiosFn = async (url, method, request) => {
    let response;
    const BASEURL = `https://capstone-backend-5rvl.onrender.com${url}`;
    console.log(`url:${BASEURL}${url}`);
    try {
      response = await axios.post(BASEURL, request);
      console.log('Response:', response);
    } catch (e) {
      console.error('Error:', e);
    }

    return response;
  };

  
  const loginSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();

    if (validateSts) {
      try {
        const response = await axiosFn(`/login`, 'post', {
          password: password,
          email: email
        });

        if (response.status === 200) {
          localStorage.setItem('_token', response.data.data.token);
          localStorage.setItem('email', response.data.data.email);
          navigate('/dashboard')
        }
      } catch (error) {
        console.error("Login Error:", error);
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <h1>Login</h1>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group"><br /></div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              &nbsp;
              <Link to="/signup">SignUp</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

