import styles from './header.module.css'
import { Link } from 'react-router-dom'
import HeaderProfile from './header-profile/HeaderProfile'
import { IconBrandTelegram, IconZoomQuestion } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import MobileMenu from './mobile-menu/MobileMenu'
import { useStore } from 'provider/RootStoreProvider'
import { observer } from 'mobx-react-lite'

const Header = () => {
    const media_mobile = useMediaQuery('(max-width:520px)')
    const { user } = useStore()

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
                        {user.is_auth ? (
                            <HeaderProfile />
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
export default observer(Header)
