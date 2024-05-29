// import { useEffect } from "react";
// import { messaging } from "./firebase"; // Ensure this is correctly imported
// import { getToken } from "firebase/messaging";
// import "./App.css";

// var token;
// function App() {
//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // Generate Token
//       token = await getToken(messaging, {
//         vapidKey: "BE4JE-reIx_LmC6QShTH0YtjV9B3ruqeSS-XKkjTWTfaXhqTahv2XmZxE25qITozzcnk0FXwLx3xOLL-anb3PLk",
//       });
//       console.log("Token Gen", token);
//       // Send this token  to server ( db)
//     } else if (permission === "denied") {
//       alert("You denied for the notification");
//     }
//   }

//   useEffect(() => {
//     // Req user for notification permission
//     requestPermission();
//   }, []);

//   const callNotifications = () => {
//     console.log(token, typeof token);
//     var tokenData = [token];
//     var data = {
//       tokens: tokenData,
//     };
//     console.log(data);
//     fetch("https://firebase-p2pflow.onrender.com/api/notification/sendToAll", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.text(); // Parse the response as JSON
//       })
//       .then((resdata) => {
//         console.log(resdata);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="App">
//       <button onClick={callNotifications}>Call Notification</button>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { messaging } from "./firebase"; // Ensure this is correctly imported
import { getToken, onMessage } from "firebase/messaging";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          const currentToken = await getToken(messaging, {
            vapidKey: "BE4JE-reIx_LmC6QShTH0YtjV9B3ruqeSS-XKkjTWTfaXhqTahv2XmZxE25qITozzcnk0FXwLx3xOLL-anb3PLk",
          });
          if (currentToken) {
            console.log("Token Gen", currentToken);
            setToken(currentToken);
            sendTokenToServer(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        } catch (error) {
          console.error('An error occurred while retrieving token. ', error);
        }
      } else {
        alert("You denied the notification permission");
      }
    }

    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Handle the incoming message as needed
    });
  }, []);

  function sendTokenToServer(currentToken) {
    fetch('https://firebase-p2pflow.onrender.com/api/notification/sendToAll', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tokens: [currentToken] }) // Assuming your backend expects an array of tokens
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;




