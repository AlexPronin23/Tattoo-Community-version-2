// React
import { Link } from "react-router";

const Logo = ({ src }) => {
  return (
    <Link to={"/"} className="logo">
      <img src={src} alt="Logo" />
    </Link>
  );
};

export default Logo;
