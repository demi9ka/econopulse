import { useMediaQuery } from '@mantine/hooks'
import styles from './mobile-menu.module.css'
import { Menu } from '@mantine/core'
import { IconBrandTelegram, IconChartAreaFilled, IconLogin2, IconLogout2, IconMenu2, IconSettings, IconUser } from '@tabler/icons-react'
import { UserContext, IUserContext } from 'provider/UserProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const MobileMenu = () => {
    const navigate = useNavigate()
    const { setUser, user } = useContext(UserContext) as IUserContext
    const media_mobile_small = useMediaQuery('(max-width:280px)')
    return (
        <Menu shadow="md" width={media_mobile_small ? 180 : 240} position="bottom-end">
            <Menu.Target>
                <div className={styles.mobile_menu_wrapper}>
                    <IconMenu2 width={45} height={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item className={styles.menu_p} onClick={() => navigate('/')} leftSection={<IconChartAreaFilled width={20} />}>
                    Главная
                </Menu.Item>
                {user ? (
                    <Menu.Item className={styles.menu_p} onClick={() => navigate('/profile')} leftSection={<IconUser width={20} />}>
                        Профиль
                    </Menu.Item>
                ) : (
                    <>
                        <Menu.Item className={styles.menu_p} onClick={() => navigate('/login')} leftSection={<IconLogin2 color="#a184f7" width={20} />}>
                            Вход
                        </Menu.Item>
                        <Menu.Item className={styles.menu_p} onClick={() => navigate('/register')} leftSection={<IconLogin2 color="#749ff5" width={20} />}>
                            Регистрация
                        </Menu.Item>
                    </>
                )}
                <Menu.Item className={styles.menu_p} onClick={() => navigate('/setting')} leftSection={<IconSettings width={20} />}>
                    Настройки
                </Menu.Item>
                <Menu.Item className={`${styles.menu_p} ${styles.tg_link}`} onClick={() => window.open('https://t.me/econopulse_ru', '_blank')} leftSection={<IconBrandTelegram color="#5fa2fa" width={20} />}>
                    Новости
                </Menu.Item>
                {user && (
                    <Menu.Item
                        onClick={() => {
                            localStorage.removeItem('JWT')
                            setUser(null)
                            navigate('/login')
                        }}
                        className={styles.menu_p}
                        leftSection={<IconLogout2 color="#F03E3E" width={20} />}
                    >
                        <p style={{ color: '#F03E3E' }}>Выйти</p>
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}
export default MobileMenu
