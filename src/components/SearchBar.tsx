import { useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import styles from "../styles/components/SearchBar.module.scss";

interface SearchBarProps {
  accessToken: string;
  sendAlbumData: (data: Album[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  accessToken,
  sendAlbumData,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  // Search
  const search = async () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Fetch Artist ID
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Fetch Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=12",
      searchParameters
    )
      .then((res) => res.json())
      .then((data) => {
        sendAlbumData(data.items);
      });
  };

  return (
    <>
      <form>
        <label className={styles.searchContainer}>
          <div className={styles.searchIconContainer}>
            <IconContext.Provider value={{ size: "21px" }}>
              <BiSearch className={styles.searchIcon} />
            </IconContext.Provider>
          </div>

          <input
            className={styles.searchBar}
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            name="searchInput"
          ></input>
        </label>
      </form>
    </>
  );
};

export default SearchBar;
