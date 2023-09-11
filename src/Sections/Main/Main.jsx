// React router
import { Link } from "react-router-dom";
// Sass
import css from "./Main.module.scss";
// Images
import party from "../../assets/images/party.jpg";

export default function Main() {
  return (
    <div className={css.main}>
      <img src={party} alt="party" />
      <Link to="signup">Sign up now</Link>
    </div>
  );
}
