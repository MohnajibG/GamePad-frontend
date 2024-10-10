import { useContext, useEffect, useState } from "react";
import GameContext from "../contexts/GameContext";
import "../assets/styles/game.css";
// import loader from "../assets/Images/loader.gif";
import GameDetails from "../components/GameDetails";

const Game = () => {
  const { gameSelected } = useContext(GameContext);

  return (
    <main>
      <div className="gameSelected">
        <h2>{gameSelected?.name}</h2>
        <div className="gameDetails">
          <img src={gameSelected?.background_image} alt={gameSelected?.name} />
          <div className="details">
            <div>
              <p>Date de sortie : {gameSelected?.released}</p>
              <p>Note : {gameSelected?.rating}</p>
            </div>

            <div>
              <h3>Plateformes :</h3>
              <div>
                {gameSelected?.platforms.map((platform) => (
                  <p key={platform.id}>{platform.platform.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="screenshots">
          <GameDetails />
          {gameSelected?.short_screenshots.slice(1).map((screenshot) => (
            <img key={screenshot.id} src={screenshot.image} alt="" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Game;
