import './App.css';
function App() {

  const reqBody={
    "username": "trevor",
    "password": "asdfasdf"
  };

  fetch('api/auth/login', {
    headers:{
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(reqBody)
  }).then((response) => Promise.all([response.json(), response.headers]))
  .then(([body, headers]) => {
    const authValue = headers.get("authorization");
    console.log(authValue);
    console.log(body);
  });

  return (
    <div className="App">
      
    </div>
  );
} 

export default App;
