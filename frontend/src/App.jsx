// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/images");
//         if (response.data) {
//           setImages(response.data);
//         } else {
//           setImages("No images yet");
//         }
//       } catch (error) {
//         console.error(error);
//         setImages("Failed to load images");
//       }
//     };
//     fetchImages();
//   }, []);

//   const handleImageUpload = (event) => {
//     setImage(event.target.files[0]);
//   };
//   const handleUpload = async () => {
//     if (!image) {
//       setMessage("Please select an image to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setUploadedImageUrl(response.data.imageUrl);
//       setMessage("Image ulpoaded successfully");
//     } catch (error) {
//       console.error(error);
//       setMessage("Image ulpoad failed");
//     }
//   };
//   return (
//     <>
//       <div>
//         <h1>Image Uploader</h1>
//         <input type="file" onChange={handleImageUpload} />
//         <button onClick={handleUpload}>Upload</button>
//         <p>{message}</p>

//         <div>
//           {uploadedImageUrl && (
//             <div>
//               <h3>Uploaded Image:</h3>
//               <img src={uploadedImageUrl} alt="" />
//             </div>
//           )}
//         </div>

//         <div>
//           <h3>All Uploaded Images</h3>
//           {images.length > 0 ? (
//             images.map((img, index) => (
//               <img
//                 src={img.imageUrl}
//                 alt={`Images${index}`}
//                 style={{ width: "100px", height: "100px", margin: "10px" }}
//               />
//             ))
//           ) : (
//             <p>No image found</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import GoogleProfile from "./pages/GoogleProfile";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import AlbumList from "./pages/AlbumList";
import AlbumDetail from "./pages/AlbumDetail ";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={< Home/>} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/albums/:albumId" element={<AlbumDetail />} />
        <Route path="/v2/profile/google" element={<GoogleProfile />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
