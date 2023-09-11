import { Link } from "react-router-dom"
import "./Header.scss"

export default function Header() {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>
        </nav>
    </header>
  )
}