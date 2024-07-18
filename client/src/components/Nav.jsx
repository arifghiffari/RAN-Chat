import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Nav() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const { currentTheme, theme, setCurrentTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar bg-secondary text-white p-4 shadow-lg" data-theme={theme[currentTheme].dataTheme}>
      <div className="flex-1">
        <h1 className="text-2xl font-bold flex items-center">
          <i className="fas fa-smile mr-2"></i> RAN CHAT
        </h1>
      </div>

      <div className="flex-1">
        {currentTheme === 'bumblebee' ? (
          <i onClick={() => setCurrentTheme("dark")} className="fa-xl fas fa-moon cursor-pointer"></i>
        ) : (
          <i onClick={() => setCurrentTheme("bumblebee")} className="fa-xl fas fa-sun cursor-pointer"></i>
        )}
      </div>

      <div className="flex-none">
        <Link onClick={handleLogout} className="btn btn-error text-white">
          Leave Room
        </Link>
      </div>
    </nav>
  );
}
