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
import AppLayout from "./components/AppLayout";
import ImageDetail from "./pages/ImageDetail";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {/* Protected Layout Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route path="photos" element={<Home />} />
          <Route path="/v2/profile/google" element={<GoogleProfile />} />
          <Route path="albums" element={<AlbumList />} />
          <Route path="albums/new" element={<CreateAlbum />} />
          <Route path="albums/:albumId" element={<AlbumDetail />} />
          <Route path="albums/:albumId/upload" element={<UploadImage />} />
          <Route path="favorites" element={<FavouriteImages />} />
          <Route path="upload-photo" element={<UploadToAllImages />} />
          <Route path="/images/:imageId/comments" element={<ImageDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
