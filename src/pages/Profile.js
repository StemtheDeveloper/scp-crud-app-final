import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../config/fbconfig";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import "../styles/App.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/fbconfig";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [readData, setReadData] = useState([]);
  const [id, setId] = useState("");
  const [showDoc, setShowDoc] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [authority, setAuthority] = useState("user");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const getData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setReadData(docSnap.data());
        } else {
          setReadData(null);
        }
      } else {
        setReadData(null);
      }
    };

    if (user) {
      getData();
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]); // Add user as a dependency

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `user images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  const handleImageFile = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    const storageRef = ref(storage, `user images/${imageUpload.name}`);
    await uploadBytes(storageRef, imageUpload).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadURL);
    });
  };

  const crudCreate = async () => {
    if (imageUpload) {
      await handleImageUpload();
    }

    if (user) {
      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        First_Name: firstName,
        Surname: surname,
        Email: email,
        Phone_Number: phoneNumber,
        Bio: bio,
        Profile_Photo_Url: imageUrl,
        Authority: authority,
      });

      // Fetch the updated data
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReadData(docSnap.data());
      }
    }
  };

  const crudDelete = async (id) => {
    const docToDelete = doc(db, "users", id);
    await deleteDoc(docToDelete);
  };

  const showEdit = (values) => {
    setId(values.id);
    setFirstName(values.First_Name);
    setSurname(values.Surname);
    setEmail(values.Email);
    setPhoneNumber(values.Phone_Number);
    setBio(values.Bio);
    setImageUrl(values.Profile_Photo_Url);
    setShowDoc(true);
    window.scrollTo(0, 0);
  };

  const crudUpdate = async () => {
    if (user) {
      const updateUser = doc(db, "users", user.uid);
      await updateDoc(updateUser, {
        First_Name: firstName,
        Surname: surname,
        Email: email,
        Phone_Number: phoneNumber,
        Bio: bio,
        Profile_Photo_Url: imageUrl,
      });

      // Fetch the updated data
      const docSnap = await getDoc(updateUser);
      if (docSnap.exists()) {
        setReadData(docSnap.data());
      }

      setShowDoc(false);
      setFirstName("");
      setSurname("");
      setEmail("");
      setPhoneNumber("");
      setBio("");
      setImageUrl("");
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <form>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          required
        />
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          required
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Profile Photo Url"
          required
        />
        <input type="file" onChange={handleImageFile} />
        <button onClick={uploadFile}>Upload Image</button>
        {!showDoc ? (
          <button type="button" onClick={crudCreate}>
            <NavLink to="Profile">Create</NavLink>
          </button>
        ) : (
          <button type="button" onClick={crudUpdate}>
            <NavLink to="Profile">Update</NavLink>
          </button>
        )}
      </form>

      <button onClick={handleSignOut}>Sign Out</button>
      <hr />
      {user ? (
        readData ? (
          <div>
            <h1>
              {readData.First_Name} {readData.Surname}
            </h1>
            <p>{readData.Email}</p>
            <p>{readData.Phone_Number}</p>
            <p>{readData.Bio}</p>
            <img src={readData.Profile_Photo_Url} alt={readData.First_Name} />
            <button onClick={() => crudDelete(user.uid)}>Delete</button>{" "}
            <button onClick={() => showEdit(readData)}>Edit</button>
          </div>
        ) : (
          <p>You haven't added any info yet.</p>
        )
      ) : (
        <p>Please sign up to create a profile.</p>
      )}
    </>
  );
}

export default Profile;
