import axios from "axios";
import { useEffect, useState } from "react";
import Fav from "../components/Fav";
import "../assets/styles/favories.css";

const Favorites = ({ token }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
        console.log("Details des favoris ===>", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
      }
    };
    fetchFavorites();
  }, [token]);

  const handleRemoveFavorites = async (favoriteId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite._id !== favoriteId)
      );

      console.log("Favori supprimé:", response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris:", error);
    }
  };

  return (
    <main>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div>
          {favorites.map((favorite) => (
            <div key={favorite._id} className="favoris">
              <Fav gameId={favorite.gameId} />
              <button onClick={() => handleRemoveFavorites(favorite._id)}>
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun jeu en favoris.</p>
      )}
    </main>
  );
};

export default Favorites;
