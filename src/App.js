import { useEffect } from "react";
import { messaging } from "./firebase"; // Ensure this is correctly imported
import { getToken } from "firebase/messaging";
import "./App.css";

var token;
function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      token = await getToken(messaging, {
        vapidKey: "BE4JE-reIx_LmC6QShTH0YtjV9B3ruqeSS-XKkjTWTfaXhqTahv2XmZxE25qITozzcnk0FXwLx3xOLL-anb3PLk",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  const callNotifications = () => {
    console.log(token, typeof token);
    var tokenData = [token];
    var data = {
      tokens: tokenData,
    };
    console.log(data);
    fetch("https://firebase-p2pflow.onrender.com/api/notification/sendToAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response as JSON
      })
      .then((resdata) => {
        console.log(resdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <button onClick={callNotifications}>Call Notification</button>
    </div>
  );
}

export default App;
