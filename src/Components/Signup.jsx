import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../Auth/Action";
import { store } from "../Auth/store";
import { useNavigate } from "react-router-dom";

const shakeAnimation = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  80% {
    transform: translateX(-12px);
  }
  40%,
  60% {
    transform: translateX(12px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

const FormWrapper = styled.div`
  width: 350px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  animation: ${shakeAnimation} 0.6s ease-in-out;
`;

const Header = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || !name) {
    setError("Please fill in all fields");
    toast.info("Please fill in all fields");
  } else {
    setError("");

    const customerDetails = { name, email, password };

    try {
      const resp =  dispatch(register(customerDetails));
    await  toast.promise(resp , {
        pending: "Requesting...",
        success: "Registration Successful👍👍",
        error: "Something Went Wrong❌",})
      navigate("/login");
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }
};

  return (
    <Wrapper>
      <FormWrapper>
        <Header>Registration Form</Header>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Register</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Signup;
