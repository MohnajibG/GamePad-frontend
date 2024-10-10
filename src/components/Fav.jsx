import axios from "axios";
import { useEffect, useState } from "react";
import loader from "../assets/Images/loader.gif";
import "../assets/styles/favories.css";

const Fav = ({ gameId }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${gameId}?key=06e62a13f1b74f97b9fbe7d65f64c057`
        );
        setGameDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du jeu:", error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  return isLoading ? (
    <img className="loader" src={loader} alt="" />
  ) : (
    <div className="fav-div">
      <p>{gameDetails.name}</p>
      <img src={gameDetails.background_image} alt={gameDetails.name} />
    </div>
  );
};

export default Fav;
