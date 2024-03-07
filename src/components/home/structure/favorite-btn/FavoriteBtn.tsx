import { useContext } from 'react'
import styles from './favorite-btn.module.css'
import { IFavoriteContext, FavoriteContext } from 'provider/FavoriteProvider'
import { IconChartDots3 } from '@tabler/icons-react'
import { IUserContext, UserContext } from 'provider/UserProvider'

const FavoriteBtn = () => {
    const { setOpened } = useContext(FavoriteContext) as IFavoriteContext
    const { user } = useContext(UserContext) as IUserContext
    if (!user) return <></>
    return (
        <button className={styles.favorite} onClick={() => setOpened(true)}>
            <span style={{ marginRight: '10px' }}>Избранное</span>
            <IconChartDots3 color="#FCC419" width={20} />
        </button>
    )
}
export default FavoriteBtn
