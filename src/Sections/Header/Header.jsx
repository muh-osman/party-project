import { Link } from "react-router-dom"
import css from "./Header.module.scss"

export default function Header() {
  return (
    <header className={css.header}>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>
        </nav>
    </header>
  )
}