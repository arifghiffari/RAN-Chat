import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav className="navbar bg-secondary text-white p-4 shadow-lg">
      <div className="flex-1">
        <h1 className="text-2xl font-bold flex items-center">
          <i className="fas fa-smile mr-2"></i> RAN CHAT
        </h1>
      </div>

      <div className="flex-none">
        <Link onClick={handleLogout} className="btn btn-error text-white">
          Leave Room
        </Link>
      </div>
    </nav>
  );
}
