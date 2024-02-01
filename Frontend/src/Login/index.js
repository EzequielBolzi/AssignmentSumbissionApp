import React, { useState } from 'react';
import {useLocalState} from "../util/useLocalStore";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("","jwt");

    console.log(username)
    function sendLoginRequest() {
        const reqBody = {
          username: username,
          password: password
        };
      
        fetch('api/auth/login', {
          headers: {
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify(reqBody)
        })
        .then((response) => {
          if (response.status === 200) {
            // Return an array of promises to Promise.all
            return Promise.all([response.json(), response.headers]);
          } else {
            // Reject the Promise with a reason
            return Promise.reject("Invalid login attempt");
          }
        })
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
          window.location.href = "dashboard";
        })
        .catch((message) => {
          alert(message);
        });
      }
      
    return (
        <>
        <div>
            <label htmlFor='username'>Username</label>
            <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div>
            <button id = "sumbit" type="button" onClick={() => sendLoginRequest()}>
                Login
            </button>
        </div>
        </>
    );
};

export default Login;