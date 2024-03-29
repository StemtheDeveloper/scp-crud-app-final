import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "../config/fbconfig";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";

function CRUD() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectContainment, setSubjectContainment] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [readData, setReadData] = useState([]);
  const [id, setId] = useState("");
  const [showDoc, setShowDoc] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const imagesListRef = ref(storage, "scp images/");

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "SCP-Subjects"));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setReadData(documents);
    };
    getData();

    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `scp images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  const handleImageFile = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    const storageRef = ref(storage, `scp images/${imageUpload.name}`);
    await uploadBytes(storageRef, imageUpload).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadURL);
    });
  };

  const crudCreate = async () => {
    if (imageUpload) {
      await handleImageUpload();
    }

    await addDoc(collection(db, "SCP-Subjects"), {
      ID: id,
      Name: subjectName,
      Description: subjectDescription,
      Containment: subjectContainment,
      Image: imageUrl,
    });

    // Fetch the updated data
    const querySnapshot = await getDocs(collection(db, "SCP-Subjects"));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    setReadData(documents);
  };

  const crudDelete = async (id) => {
    const docToDelete = doc(db, "SCP-Subjects", id);
    await deleteDoc(docToDelete);
  };

  const showEdit = (values) => {
    setId(values.id);
    setSubjectName(values.Name);
    setSubjectDescription(values.Description);
    setSubjectContainment(values.Containment);
    setImageUrl(values.Image);
    setShowDoc(true);
    window.scrollTo(0, 0);
  };

  const crudUpdate = async () => {
    const updateSubject = doc(db, "SCP-Subjects", id);
    await updateDoc(updateSubject, {
      ID: id,
      Name: subjectName,
      Description: subjectDescription,
      Containment: subjectContainment,
      Image: imageUrl,
    });

    setShowDoc(false);
    setId("");
    setSubjectName("");
    setSubjectDescription("");
    setSubjectContainment("");
    setImageUrl("");
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
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={subjectDescription}
          onChange={(e) => setSubjectDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          value={subjectContainment}
          onChange={(e) => setSubjectContainment(e.target.value)}
          placeholder="Containment Procedures"
          required
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image"
          required
        />
        <input type="file" onChange={handleImageFile} />
        <button onClick={uploadFile}>Upload Image</button>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))}
        {!showDoc ? (
          <button type="button" onClick={crudCreate}>
            <NavLink to="CRUD">Create</NavLink>
          </button>
        ) : (
          <button type="button" onClick={crudUpdate}>
            <NavLink to="CRUD">Update</NavLink>
          </button>
        )}
      </form>

      <hr />
      {readData.map((values) => (
        <div key={values.id}>
          <h1>{values.Name}</h1>
          <p>{values.Description}</p>
          <p>{values.Containment}</p>
          <img src={values.Image} alt={values.Name} />
          <button onClick={() => crudDelete(values.id)}>Delete</button>{" "}
          <button onClick={() => showEdit(values)}>Edit</button>
        </div>
      ))}
    </>
  );
}

export default CRUD;
