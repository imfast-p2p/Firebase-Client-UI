import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import logo from "./logo.svg";
import "./App.css";

var token;
function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      token = await getToken(messaging, {
        vapidKey:
          "BE4JE-reIx_LmC6QShTH0YtjV9B3ruqeSS-XKkjTWTfaXhqTahv2XmZxE25qITozzcnk0FXwLx3xOLL-anb3PLk",
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
    fetch(`https://firebase-p2pflow.onrender.com/api/notification/sendToAll`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token
      })
    }).then(response => {
      return response.json();
    })
      .then((resdata) => {
        console.log(resdata);
        alert("called");
      }).catch((error) => {
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
