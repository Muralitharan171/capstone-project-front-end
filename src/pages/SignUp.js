import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import react from 'react-bootstrap';
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useNavigate
} from "react-router-dom";

function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  
  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const axiosFn = async (url, method, request) => {
    
    const BASEURL = `https://capstone-backend-5rvl.onrender.com`;
    console.log(`url:${BASEURL}`);
    try {
      const response = await axios.post(BASEURL, request);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error("Axios error:", error);
      throw error; // Rethrow the error for better error handling
    }

    
  }

  const signUpSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = handleValidation();

    if (formIsValid) {
      try {
        const usersCreate = await axiosFn("/signup", 'post', {
          "password": password,
          "email": email,
          "name": email
        });

        if (usersCreate.status === 201) {
          // Handle success
          console.log(usersCreate.data);
          localStorage.setItem('_token', usersCreate.data.data.token);
          localStorage.setItem('email', usersCreate.data.data.email);
          setEmail('');
          setPassword('');
          navigate('/dashboard');
        } else if (usersCreate.data.errorCode === "USER_EXISTS") {
          // Handle user exists error
          console.error(usersCreate.data.message);
        } else {
          // Handle other errors
          console.error("Technical error occurred");
        }
      } catch (error) {
        // Handle Axios error
        console.error("Error during signup:", error);
      }
    }
  };
  
   
 

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="signupform" onSubmit={signUpSubmit}>
              <h1>SignUp</h1>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
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
                  value={password}
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
              <Link to="/login">Login</Link>             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
