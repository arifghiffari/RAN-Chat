import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <i className="fas fa-smile"></i> RAN CHAT
      </h1>
      <Link onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600">
        Leave Room
      </Link>
    </nav>
  );
}
