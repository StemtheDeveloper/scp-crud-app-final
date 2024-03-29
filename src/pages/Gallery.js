import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "../styles/App.css";

// Initialize Firebase
// Replace this with your Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxX98ZxNczF4OH5oxNIoochInxPWQKa2k",
  authDomain: "scp-crud-app-final.firebaseapp.com",
  projectId: "scp-crud-app-final",
  storageBucket: "scp-crud-app-final.appspot.com",
  messagingSenderId: "213113067191",
  appId: "1:213113067191:web:fa29cb0de19c7a44bedf32",
  measurementId: "G-J64PLREZTB",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Gallery() {
  const [image, setImage] = useState(null);
  const [urls, setUrls] = useState([]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrls((prevUrls) => [...prevUrls, url]);
          });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {urls.map((url, index) => (
        <img key={index} src={url} alt="Uploaded" height="300" width="400" />
      ))}
    </div>
  );
}
