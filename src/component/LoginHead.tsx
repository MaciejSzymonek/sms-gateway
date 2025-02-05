import { useState } from "react";
import LoginPage from "./LoginPage"; // Assuming LoginPage is the child component
import { login } from "./ApiManager";

const LoginHead = () => {
  const [errorMsg, setErrorMsg] = useState("");

  // Handle the login submission logic
  const handleLogin = async (user_id: string, password: string) => {
    login(user_id, password)
      .then((response) => {
        if (response.success) {
          console.log("Login successful:", response.data);
          window.location.replace("http://localhost:5173/tables");
        } else {
          console.error("Login failed:", response.message);
          if (response.message.toLowerCase().includes("credentials")) {
            setErrorMsg("Wrong Password");
          } else if (response.message.toLowerCase().includes("user")) {
            setErrorMsg("No user with this id found");
          } else {
            setErrorMsg("gamba");
          }

          // Handle error in your component, e.g., show it to the user
        }
      })
      .catch((error) => {
        setErrorMsg(error);
        console.error("Unexpected error during login:", error);
      });
  };

  return <LoginPage onLogin={handleLogin} error={errorMsg} />;
};

export default LoginHead;
