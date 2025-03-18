import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 shadow-md">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold text-yellow-400">
          Crypto Tracker
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">
            Coins
          </Link>
          <Link to="/exchanges" className="hover:text-yellow-300">
            Exchanges
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
