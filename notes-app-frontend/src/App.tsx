import { useState, useEffect } from "react";
import MainPageLoggedIn from "../components/MainPageLoggedIn";
import HomePage from "../components/HomePage";
import SignIn from "../components/SignIn";
import LogIn from "../components/LogIn";
import axios from "axios";
import "./index.css";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("home"); // 'home', 'signin', 'login', 'main'
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem("Token");
    console.log(token);
  }, []);

  const showSignInbox = () => setCurrentPage("signin");
  const showLogInbox = () => setCurrentPage("login");
  const showMainBox = () => setCurrentPage("main");
  const showHomePageBox = () => setCurrentPage("home");

  // Log in Function
  const logInFunction = async (email: string, password: string) => {
    try {
      const req_body = { email, password };
      const response = await axios.post("http://localhost:64001/api/user/login", req_body);
      const receivedToken = response.data;

      // Save token and switch to main page
      localStorage.setItem("Token", receivedToken);
      setToken(receivedToken);
      showMainBox();
    } catch (error) {
      showHomePageBox();
      console.error(error);
    }
  };

  // Sign in Function
  const signInFunction = async (name: string, email: string, password: string) => {
    try {
      const req_body = { username: name, email, password };
      await axios.post("http://localhost:64001/api/user/register", req_body);
      await logInFunction(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  // Log out Function
  const logOutFunction = async () => {
    localStorage.removeItem("Token");
    showSignInbox();
  };

  // Add Note Function
  const addNewNotefunction = async (title: string, body: string) => {
    try {
      const req_body = { title, body };
      const token = localStorage.getItem("Token");

      if (!token) throw new Error("Token not found!");

      await axios.post("http://localhost:64001/api/notes", req_body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };



  // Get All Notes Function
  interface Note {
    body: string;
    createdAt: string;
    title: string;
    updatedAt: string;
    user_id: string;
    __v: string;
    _id: string;
  }
  const getAllNotesFunction = async (): Promise<Note[]> => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("No token found! User needs to log in.");

      const response = await axios.get("http://localhost:64001/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("Token");
        window.location.reload();
      }

      return [];
    }
  };

  return (
    <div id="MainPageBox" className="overflow-x-hidden overflow-y-hidden">
      {currentPage === "home" && <HomePage showSignInbox={showSignInbox} />}
      {currentPage === "signin" && (
        <SignIn logInInstead={showLogInbox} signInFunction={signInFunction} />
      )}
      {currentPage === "login" && (
        <LogIn showSignInbox={showSignInbox} logInFunction={logInFunction} />
      )}
      {currentPage === "main" && (
        <MainPageLoggedIn
          addNewNotefunction={addNewNotefunction}
          getAllNotesFunction={getAllNotesFunction}
          logOutFunction = {logOutFunction}
        />
      )}
    </div>
  );
}

export default App;
