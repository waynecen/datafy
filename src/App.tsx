import { useEffect, useState } from "react";
import "./App.scss";
// import LoginToSpotify from './components/buttons/LoginToSpotify'
import SearchBar from "./components/SearchBar";
import AlbumCard from "./components/AlbumCard";
import logoImage from "./assets/datafy_logo.png";

interface Album {
  images: {
    url: string;
  }[];
  name: string;
}

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [albumData, setAlbumData] = useState<Album[]>([]);

  const handleAlbumData = (data: Album[]) => {
    setAlbumData(data);
  };

  // POST req for access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const authParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        };

        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParameters
        );
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  return (
    <>
      <div className="navBar">
        <div className="logo">
          <a href="/">
            <img src={logoImage} alt="Logo" />
          </a>
        </div>
        <SearchBar accessToken={accessToken} sendAlbumData={handleAlbumData} />
      </div>
      <div className="container">
        <div className="albumListContainer inline-snap">
          {albumData.map((album: Album, index: number) => {
            return (
              <AlbumCard
                image={album.images[0].url}
                key={index}
                name={album.name}
              />
            );
          })}
        </div>
        <div className="statContainer">
          <h3 className="placeholderText">Select an album</h3>
        </div>
      </div>
    </>
  );
}

export default App;
