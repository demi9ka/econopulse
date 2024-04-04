import styles from './header-profile.module.css'
import { useState } from 'react'
import { Menu } from '@mantine/core'
import { IconChevronDown, IconLogout2, IconSettings, IconUserCircle, IconUser } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'provider/RootStoreProvider'
import { observer } from 'mobx-react-lite'

const HeaderProfile = () => {
    const { user } = useStore()
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    if (!user.is_auth) return <>Ошибка</>
    return (
        <Menu onChange={e => setActive(e)} shadow="md" withArrow width={170} position="bottom-end">
            <Menu.Target>
                <div className={styles.wrapper}>
                    <IconUserCircle color="#74C0FC" />
                    <p className={styles.name}>{user.name}</p>
                    <IconChevronDown width={16} className={`${styles.icon} ${!active && styles.icon_rotate}`} />
                </div>
            </Menu.Target>
            <Menu.Dropdown p={3}>
                <Menu.Item onClick={() => navigate('/profile')} p={6} leftSection={<IconUser width={20} />}>
                    Профиль
                </Menu.Item>
                <Menu.Item onClick={() => navigate('/setting')} p={6} leftSection={<IconSettings width={20} />}>
                    Настройки
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        localStorage.removeItem('JWT')

                        navigate('/login')
                    }}
                    p={6}
                    leftSection={<IconLogout2 color="#F03E3E" width={20} />}
                >
                    <p style={{ color: '#F03E3E' }}>Выйти</p>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export default observer(HeaderProfile)
