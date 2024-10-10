import { Link } from "react-router-dom";
import { FaXbox } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";

const Header = ({ token, username, handleToken, search, setSearch }) => {
  const handleLogout = () => {
    handleToken(null, null);
  };
  return (
    <header>
      <div className="header-all">
        <div className="input-logo">
          <div>
            <Link to="/">
              <h2>GAMEPAD</h2>
            </Link>
            <div className="icon-platform ">
              <div>
                <FaXbox aria-label="Xbox platform" />
                <FaPlaystation aria-label="PlayStation platform" />
              </div>
              <div>
                <SiNintendoswitch aria-label="Nintendo Switch platform" />
                <TiVendorMicrosoft aria-label="Microsoft platform" />
              </div>
            </div>
          </div>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {token ? (
          <div className="btn-usernam">
            <button className="btn-deco" onClick={handleLogout}>
              Déconnexion
            </button>
            <div>
              <span className="initial">{username[0].toUpperCase()}</span>
              <p className="username">{username}</p>
            </div>
          </div>
        ) : (
          <div className="header-all">
            <div className="btn-lgn-sgnup">
              <Link to="/login">
                <button>LOG IN</button>
              </Link>
              <Link to="/signup">
                <button>SIGN UP</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="hero">
        <h2>GAMEPAD</h2>
        <div>
          <div>
            <FaXbox />
            <FaPlaystation />
          </div>
          <div>
            <SiNintendoswitch />
            <TiVendorMicrosoft />
          </div>
        </div>
      </div>
      <div className="menu">
        {token ? (
          <Link to="/favorites">
            <h2 className="fav-">Favorites</h2>
          </Link>
        ) : (
          <p> </p>
        )}

        <div>
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/reviews">
            <h2>Reviews</h2>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
