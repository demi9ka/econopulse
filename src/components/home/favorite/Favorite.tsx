import { useContext } from 'react'
import { FavoriteContext, IFavoriteContext } from 'provider/FavoriteProvider'
import { Modal } from '@mantine/core'
import SaveFavorite from './save-favorite/SaveFavorite'
import LoadFavorite from './load-favorite/LoadFavorite'

const FavoriteMenu = () => {
    const { opened, setOpened } = useContext(FavoriteContext) as IFavoriteContext
    return (
        <Modal size={400} opened={opened} onClose={() => setOpened(false)} title="Избранное" centered>
            <SaveFavorite />
            <LoadFavorite />
        </Modal>
    )
}
export default FavoriteMenu
