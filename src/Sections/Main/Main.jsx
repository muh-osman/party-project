// React router
import { Link } from "react-router-dom";
// Sass
import css from "./Main.module.scss";

export default function Main() {
  return (
    <div className={css.main}>
      <h1>Best event ever!</h1>
      <Link to="joinus">Join us now</Link>
    </div>
  );
}
