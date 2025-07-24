import { Routes, Route } from "react-router-dom";
import GoogleProfile from "./pages/GoogleProfile";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import AlbumList from "./pages/AlbumList";
import AlbumDetail from "./pages/AlbumDetail ";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CreateAlbum from "./pages/CreateAlbum";
import UploadImage from "./pages/AlbumImageUpload";
import FavouriteImages from "./pages/FavouriteImages";
import UploadToAllImages from "./pages/UploadImage";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/photos" element={<Home />} />
        <Route path="/upload-photo" element={<UploadToAllImages />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/albums/:albumId" element={<AlbumDetail />} />
        <Route path="/albums/new" element={<CreateAlbum />} />
        <Route path="/favorites" element={<FavouriteImages />} />
        <Route path="/albums/:albumId/upload" element={<UploadImage />} />
        <Route path="/v2/profile/google" element={<GoogleProfile />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
