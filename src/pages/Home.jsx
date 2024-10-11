import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/counter";
import { GameContext } from "../contexts/GameContext";

import "../assets/styles/home.css";

import loader from "../assets/Images/loader.gif";

const Home = ({ search, page_size, token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const { setGameSelected } = useContext(GameContext);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddFavorites = async (gameId) => {
    try {
      const response = await axios.post(
        "https://site--gamepade-backend--dnxhn8mdblq5.code.run/favorites",
        { gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Favori ajouté:", response.data);

      setFavorites((prevFavorites) => {
        if (!prevFavorites.includes(gameId)) {
          return [...prevFavorites, gameId];
        } else {
          console.log("Jeu déjà ajouté aux favoris");
          return prevFavorites;
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=06e62a13f1b74f97b9fbe7d65f64c057&search=${search}&page=${currentPage}&page_size=${page_size}`
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / 30));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, currentPage, page_size]);

  const handleGameClick = (game) => {
    setGameSelected(game);
    navigate(`/game/${game.id}`);
  };

  return isLoading ? (
    <img className="loader" src={loader} alt="" />
  ) : (
    <main>
      <div className="games">
        {data.results.map((game) => (
          <div className="carte" key={game.id}>
            <div>
              <div className="game">
                <p>{game.name}</p>

                <img
                  src={game.background_image}
                  alt={game.name}
                  onClick={() => handleGameClick(game)}
                />
              </div>
              <div className="consoles">
                <div>
                  {game.platforms.map((platformData, idx) => (
                    <p key={idx}>{platformData.platform.name}</p>
                  ))}
                </div>
              </div>
              {token ? ( // Vérification du token pour afficher le bouton
                <button
                  onClick={() => handleAddFavorites(game.id)}
                  disabled={favorites.includes(game.id)}
                >
                  {favorites.includes(game.id)
                    ? "Déjà dans les favoris"
                    : "Ajouter aux favoris"}
                </button>
              ) : (
                <p> </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages > 0 ? totalPages : 1}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Home;
