import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/signup.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importer les icônes

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour la visibilité du mot de passe
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        email,
        username,
        password,
      });
      handleToken(response.data.token, response.data.username);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response?.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        setErrorMessage("Veuillez réessayer");
      }
    } finally {
      setIsLoading(false); // S'assurer que setIsLoading est appelé
    }
  };

  return (
    <main className="main-signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="inpt-signup"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required // Validation de base
        />
        <input
          className="inpt-signup"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required // Validation de base
        />
        <div className="inpt-signup-pw ">
          <input
            className="inpt-signup"
            type={passwordVisible ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="btn-signup"
            type="button"
            onClick={togglePasswordVisibility}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className="btn-signup"
          type="submit"
          disabled={isLoading || !username || !email || !password}
        >
          {isLoading ? "Inscription..." : "Sign Up"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to="/login">
          <p className="p-signup">Tu as déjà un compte ? Connecte-toi!</p>
        </Link>
      </form>
    </main>
  );
};

export default Signup;
