import { Modal } from '@mantine/core'
import SaveFavorite from './save-favorite/SaveFavorite'
import LoadFavorite from './load-favorite/LoadFavorite'
import { useStore } from 'provider/RootStoreProvider'

const FavoriteMenu = () => {
    const {
        favorite: { modal_open, setOpen },
    } = useStore()
    return (
        <Modal size={400} opened={modal_open} onClose={() => setOpen(false)} title="Избранное" centered>
            <SaveFavorite />
            <LoadFavorite />
        </Modal>
    )
}
export default FavoriteMenu
