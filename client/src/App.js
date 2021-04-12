import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
function App() {
  const formData = { ciastko: "Ciastko" };
  const onSendPost = () => {
    axios.post("http://localhost:5000", formData, {
      withCredentials: true,
    });
  };
  const onSendGet = () => {
    axios.get("http://localhost:5000", {
      withCredentials: true,
    });
  };
  return (
    <div className="App">
      <button onClick={onSendPost}>Send post</button>
      <button onClick={onSendGet}>Send get</button>
    </div>
  );
}

export default App;
