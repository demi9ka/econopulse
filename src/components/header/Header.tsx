import styles from './header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <img className={styles.logo} src="/logo.svg" alt="" />
                <h2>Finstream</h2>
            </div>
            <div></div>
        </header>
    )
}
export default Header
