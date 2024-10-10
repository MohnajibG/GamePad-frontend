import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Aside = ({ token, username = "" }) => {
  // Utilisation d'une valeur par défaut
  const [platformsData, setPlatformsData] = useState([]);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(true);
  const [storesData, setStoresData] = useState([]);
  const [isLoadingStores, setIsLoadingStores] = useState(true);

  const platformIds = [1, 187, 7, 4];

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/platforms?key=06e62a13f1b74f97b9fbe7d65f64c057`
        );
        setPlatformsData(response.data.results);
        setIsLoadingPlatforms(false);
      } catch (error) {
        console.log(error);
        setIsLoadingPlatforms(false);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/stores?key=06e62a13f1b74f97b9fbe7d65f64c057`
        );
        setStoresData(response.data.results);
        setIsLoadingStores(false);
      } catch (error) {
        console.log(error);
        setIsLoadingStores(false);
      }
    };

    fetchPlatforms();
    fetchStores();
  }, []);

  if (isLoadingPlatforms || isLoadingStores) {
    return <p className="loading-message">Chargement des données...</p>;
  }

  return (
    <main className="aside">
      {!token && (
        <div className="welcome-div">
          {username ? (
            <div>
              <h2>Welcome</h2>
              <div>
                <span className="initial">
                  {username.charAt(0).toUpperCase()}
                </span>
                <p className="username">{username}</p>
              </div>
            </div>
          ) : (
            <p className="username"> </p>
          )}
          <Link to="/favorites">
            <h2 className="fav-">Favorites</h2>
          </Link>
        </div>
      )}

      <div>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/reviews">
          <h2>Reviews</h2>
        </Link>
      </div>

      <div className="platforms">
        {platformsData
          .filter((platformData) => platformIds.includes(platformData.id))
          .map((platforms) => (
            <div key={platforms.id}>
              <p>{platforms.name}</p>
            </div>
          ))}
      </div>

      <div className="stores">
        <h2>Stores</h2>
        {storesData.map((storeData) => (
          <div key={storeData.id}>
            <p>{storeData.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Aside;
