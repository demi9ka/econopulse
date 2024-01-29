import { useContext } from 'react'
import { FavoriteMenuContext, IFavoriteMenuContext } from 'provider/FavoriteProvider'
import { Modal } from '@mantine/core'
import SaveFavorite from './save-favorite/SaveFavorite'
import LoadFavorite from './load-favorite/LoadFavorite'

const FavoriteMenu = () => {
    const { view_modal, setViewModal } = useContext(FavoriteMenuContext) as IFavoriteMenuContext
    return (
        <Modal size={400} opened={view_modal} onClose={() => setViewModal(false)} title="Избранное" centered>
            <SaveFavorite />
            <LoadFavorite />
        </Modal>
    )
}
export default FavoriteMenu
