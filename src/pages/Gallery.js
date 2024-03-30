import { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../config/fbconfig";
import "../styles/App.css";

export default function Gallery() {
  const [image, setImage] = useState(null);
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, "scp images");
    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setUrls((prevUrls) => [...prevUrls, url]);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `scp images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        setMessage("Error uploading image.");
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          setUrls((prevUrls) => [...prevUrls, url]);
          setMessage("Image uploaded successfully.");
        });
      }
    );
  };

  return (
    <>
      <h1>Gallery</h1>
      <div id="galleryCont">
        <div id="imgUploadField">
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div id="message">{message && <p>{message}</p>}</div>

        <div id="imageContainer">
          {urls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Uploaded"
              height="auto"
              width="auto"
            />
          ))}
        </div>
      </div>
    </>
  );
}
