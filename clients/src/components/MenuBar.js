import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import SecuredLogout from './SecuredLogout'

const App = () => {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Thermo Fisher
        </Link>
        <div className="navbar-nav mr-auto">
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={SecuredLogout}>
                  Log Out
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
            </li>
            </div>  
          ) : (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
          )
          }
        </div>
      </nav>
    )
  }

export default App