// // import { useState, useEffect } from "react";
// // import { db } from "../config/fbconfig";
// // import {
// //   addDoc,
// //   collection,
// //   deleteDoc,
// //   doc,
// //   getDocs,
// //   updateDoc,
// // } from "firebase/firestore";

// // function CRUD() {
// //   const [subjectName, setSubjectName] = useState("");
// //   const [subjectDescription, setSubjectDescription] = useState("");
// //   const [subjectContainment, setSubjectContainmentProcedures] = useState("");
// //   const [subjectImage, setSubjectImage] = useState("");
// //   const [readData, setReadData] = useState([]);
// //   const [id, setId] = useState("");
// //   const [showDoc, setShowDoc] = useState(false);

// //   useEffect(() => {
// //     const getData = async () => {
// //       const ourDocsToRead = await getDocs(OurCollection);
// //       setReadData(
// //         ourDocsToRead.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
// //       );
// //     };
// //     getData();
// //   }, []);

// //   const OurCollection = collection(db, "SCP-Subjects");

// //   const crudCreate = async () => {
// //     await addDoc(OurCollection, {
// //       ID: id,
// //       Name: subjectName,
// //       Description: subjectDescription,
// //       Containment: subjectContainment,
// //       Image: subjectImage,
// //     });
// //   };

// //   const crudDelete = async (id) => {
// //     const docToDelete = doc(db, "SCP-Subjects", id);
// //     await deleteDoc(docToDelete);
// //   };

// //   const showEdit = async (id, name, description, containment, image) => {
// //     setId(id);
// //     setSubjectName(name);
// //     setSubjectDescription(description);
// //     setSubjectContainmentProcedures(containment);
// //     setSubjectImage(image);
// //     setShowDoc(true);
// //   };

// //   const crudUpdate = async () => {
// //     const updateSubject = doc(db, "SCP-Subjects", id);
// //     await updateDoc(updateSubject, {
// //       ID: id,
// //       Name: subjectName,
// //       Description: subjectDescription,
// //       Containment: subjectContainment,
// //       Image: subjectImage,
// //     });

// //     setShowDoc(false);
// //     setSubjectName("");
// //     setSubjectDescription("");
// //     setSubjectContainmentProcedures("");
// //     setSubjectImage("");
// //   };

// //   return (
// //     <>
// //       <form>
// //         <input
// //           value={id}
// //           onChange={(id) => setId(id.target.value)}
// //           placeholder="ID"
// //           required
// //         />
// //         <input
// //           value={subjectName}
// //           onChange={(name) => setSubjectName(name.target.value)}
// //           placeholder="Name"
// //           required
// //         />
// //         <input
// //           value={subjectDescription}
// //           onChange={(description) =>
// //             setSubjectDescription(description.target.value)
// //           }
// //           placeholder="Description"
// //           required
// //         />
// //         <input
// //           value={subjectContainment}
// //           onChange={(containment) =>
// //             setSubjectContainmentProcedures(containment.target.value)
// //           }
// //           placeholder="Containment Procedures"
// //           required
// //         />
// //         <input
// //           value={subjectImage}
// //           onChange={(image) => setSubjectImage(image.target.value)}
// //           placeholder="Image"
// //           required
// //         />
// //         {!showDoc ? (
// //           <button onClick={crudCreate}>Create</button>
// //         ) : (
// //           <button onClick={crudUpdate}>Update</button>
// //         )}
// //       </form>

// //       <hr />
// //       {readData.map((values) => (
// //         <div key={values.ID}>
// //           <h1>{values.Name}</h1>
// //           <p>{values.Description}</p>
// //           <p>{values.Containment}</p>
// //           <img src={values.Image} alt={values.Name} />
// //           <button onClick={() => crudDelete(values.id)}>Delete</button>{" "}
// //           <button
// //             onClick={() =>
// //               showEdit(
// //                 values.ID,
// //                 values.Name,
// //                 values.Description,
// //                 values.Containment,
// //                 values.Image
// //               )
// //             }
// //           >
// //             Edit
// //           </button>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// // export default CRUD;

// import { useState, useEffect } from "react";
// import { db } from "../config/fbconfig";
// import { Link, NavLink } from "react-router-dom";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";

// function CRUD() {
//   const [subjectName, setSubjectName] = useState("");
//   const [subjectDescription, setSubjectDescription] = useState("");
//   const [subjectContainment, setSubjectContainment] = useState("");
//   const [subjectImage, setSubjectImage] = useState("");
//   const [readData, setReadData] = useState([]);
//   const [id, setId] = useState("");
//   const [showDoc, setShowDoc] = useState(false);

//   useEffect(() => {
//     const getData = async () => {
//       const querySnapshot = await getDocs(OurCollection);
//       const documents = [];
//       querySnapshot.forEach((doc) => {
//         documents.push({ ...doc.data(), id: doc.id });
//       });
//       setReadData(documents);
//     };
//     getData();
//   }, []);

//   const OurCollection = collection(db, "SCP-Subjects");

//   const crudCreate = async () => {
//     await addDoc(OurCollection, {
//       Name: subjectName,
//       Description: subjectDescription,
//       Containment: subjectContainment,
//       Image: subjectImage,
//     });
//   };

//   const crudDelete = async (id) => {
//     const docToDelete = doc(db, "SCP-Subjects", id);
//     await deleteDoc(docToDelete);
//   };

//   const showEdit = (values) => {
//     setId(values.id);
//     setSubjectName(values.Name);
//     setSubjectDescription(values.Description);
//     setSubjectContainment(values.Containment);
//     setSubjectImage(values.Image);
//     setShowDoc(true);
//     window.scrollTo(0, 0);
//   };

//   const crudUpdate = async () => {
//     const updateSubject = doc(db, "SCP-Subjects", id);
//     await updateDoc(updateSubject, {
//       Name: subjectName,
//       Description: subjectDescription,
//       Containment: subjectContainment,
//       Image: subjectImage,
//     });

//     setShowDoc(false);
//     setId("");
//     setSubjectName("");
//     setSubjectDescription("");
//     setSubjectContainment("");
//     setSubjectImage("");
//   };

//   return (
//     <>
//       <form>
//         <input
//           value={id}
//           onChange={(e) => setId(e.target.value)}
//           placeholder="ID"
//           required
//         />
//         <input
//           value={subjectName}
//           onChange={(e) => setSubjectName(e.target.value)}
//           placeholder="Name"
//           required
//         />
//         <input
//           value={subjectDescription}
//           onChange={(e) => setSubjectDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//         <input
//           value={subjectContainment}
//           onChange={(e) => setSubjectContainment(e.target.value)}
//           placeholder="Containment Procedures"
//           required
//         />
//         <input
//           value={subjectImage}
//           onChange={(e) => setSubjectImage(e.target.value)}
//           placeholder="Image"
//           required
//         />
//         {!showDoc ? (
//           <button type="button" onClick={crudCreate}>
//             <NavLink to="/">Create</NavLink>
//           </button>
//         ) : (
//           <button type="button" onClick={crudUpdate}>
//             <NavLink to="/">Update</NavLink>
//           </button>
//         )}
//       </form>

//       <hr />
//       {readData.map((values) => (
//         <div key={values.id}>
//           <h1>{values.Name}</h1>
//           <p>{values.Description}</p>
//           <p>{values.Containment}</p>
//           <img src={values.Image} alt={values.Name} />
//           <button onClick={() => crudDelete(values.id)}>Delete</button>{" "}
//           <button onClick={() => showEdit(values)}>Edit</button>
//         </div>
//       ))}
//     </>
//   );
// }

// export default CRUD;

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
            <NavLink to="/">Create</NavLink>
          </button>
        ) : (
          <button type="button" onClick={crudUpdate}>
            <NavLink to="/">Update</NavLink>
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
