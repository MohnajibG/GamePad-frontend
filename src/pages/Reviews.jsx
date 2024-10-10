import gameover from "../assets/Images/gameover.gif";
import { Link } from "react-router-dom";

const Reviews = () => {
  return (
    <main>
      <img src={gameover} alt="" />
      <Link to="/">
        <h2 style={{ textAlign: "center", fontSize: "38px" }}>Home</h2>
      </Link>
    </main>
  );
};

export default Reviews;
