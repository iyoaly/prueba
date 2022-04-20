import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { url, fetchApi } from "./api.js";

function Login() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    sistema: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      error: "",
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetchApi(
      url + "/login",
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      state
    );

    const data = await response.json();

    if (data.res) {
      sessionStorage.setItem("token", data.token);
      navigate(`/home`);
    } else {
      setState((prevState) => ({
        ...prevState,
        error: data.message,
      }));
    }
  }

  return (
    <Form onSubmit={(e) => handleLogin(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={state.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={state.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Text className="text-muted">{state.error}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
