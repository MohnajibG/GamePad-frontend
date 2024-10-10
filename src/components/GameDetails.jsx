import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GameContext from "../contexts/GameContext";
import "../assets/styles/game.css";

const GameDetails = () => {
  const { gameSelected } = useContext(GameContext);
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (gameSelected) {
        try {
          const response = await axios.get(
            `https://api.rawg.io/api/games/${gameSelected.id}?key=06e62a13f1b74f97b9fbe7d65f64c057`
          );
          setGameDetails(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails du jeu:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGameDetails();
  }, [gameSelected]);

  if (isLoading) {
    return <p> </p>;
  }

  return (
    <div>
      <p>{gameDetails?.description_raw || "Pas de description disponible."}</p>
    </div>
  );
};

export default GameDetails;
