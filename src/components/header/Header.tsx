import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext, IUserContext } from 'provider/UserProvider'
import HeaderProfile from './header-profile/HeaderProfile'
import { IconBrandTelegram, IconZoomQuestion } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import MobileMenu from './mobile-menu/MobileMenu'

const Header = () => {
    const { user } = useContext(UserContext) as IUserContext
    const media_mobile = useMediaQuery('(max-width:520px)')

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.nav}>
                    <Link className={styles.poster} to={'/'}>
                        <img className={styles.logo} src="/logo.svg" alt="" />
                        <h2>
                            Econopulse<span className={styles.prefix}>.ru</span>{' '}
                        </h2>
                    </Link>
                </div>
                {!media_mobile ? (
                    <div className={styles.nav}>
                        <Link className={styles.manual_link} to={'/manual'}>
                            <p>Как пользоваться</p>
                            <IconZoomQuestion color="#f5d238" size={20} />
                        </Link>
                        <a className={styles.tg_link} target="_blank" href="https://t.me/econopulse_ru">
                            <IconBrandTelegram color="#5fa2fa" size={20} />
                        </a>
                        {user ? (
                            <HeaderProfile data={user} />
                        ) : (
                            <>
                                <Link className={`${styles.auth} ${styles.register}`} to={'/register'}>
                                    Регистрация
                                </Link>
                                <Link className={`${styles.auth} ${styles.login}`} to={'/login'}>
                                    Войти
                                </Link>
                            </>
                        )}
                    </div>
                ) : (
                    <MobileMenu />
                )}
            </div>
        </header>
    )
}
export default Header
