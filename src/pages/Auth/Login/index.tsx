import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useLoginUserMutation } from "../../../redux/features/Auth/authApi";
import { LoginUserInput } from "../../../types";
import Spinner from "../../../utils/Spinner";
import "../index.scss";

const Login = () => {
  const [loginUser, { data, isError, error, isLoading, isSuccess }] =
    useLoginUserMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("ttl", JSON.stringify(data.ttl));
      localStorage.setItem("_id", JSON.stringify(data.id));
      localStorage.setItem("_role", JSON.stringify(data.role));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error && "status" in error) {
      //@ts-ignore
      setErrorMsg(error.data.error);
    }
  }, [error]);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submit = async (e: any) => {
    e.preventDefault();
    await handleLogin({
      email: input.email,
      password: input.password,
    });
  };

  const handleLogin = async (loginUserInput: LoginUserInput) => {
    try {
      await loginUser({ email: input.email, password: input.password });
      // navigate("/",{replace:true});
      //TODO: is it the best solution?
      window.location.href="http://localhost:3000/"
    } catch (err) {
      //@ts-ignore
      setErrorMsg(error?.data.error);
    }
  };

  return (
    <div className="auth --center-flex">
      {isLoading && <Spinner />}
      <form className="auth__container" onSubmit={submit}>
        <div className="auth__section">
          <h1 className="auth__header">Login</h1>
        </div>
        {isError && (
          <div className="auth__section">
            <div className="auth__section--error">
              <p>{errorMsg}</p>
            </div>
          </div>
        )}
        <div className="auth__section">
          <label className="auth__section--label">Email</label>
          <input
            onChange={handleInput}
            name="email"
            type="text"
            className="auth__section--input"
          />
        </div>
        <div className="auth__section --margin-bottom-4">
          <label className="auth__section--label">Password</label>
          <input
            onChange={handleInput}
            name="password"
            type="password"
            className="auth__section--input"
          />
        </div>
        <div className="auth__section">
          <Button title="Sign in" />
        </div>
        <div className="auth__section">
          <Link to={"/account/register"} className="auth__section--paragraph">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;