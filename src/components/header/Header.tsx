import styles from './header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to={'/'}>
                <img className={styles.logo} src="/logo.svg" alt="" />
                <h2>Finstream</h2>
            </Link>
            <div>
                <Link to={'/register'}>Регистрация</Link>
                <Link to={'/login'}>Вход</Link>
            </div>
        </header>
    )
}
export default Header
