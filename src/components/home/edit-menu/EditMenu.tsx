import { Modal } from '@mantine/core'
import { useContext } from 'react'

import { EditMenuContext, IEditMenuContext } from 'provider/EditMenuProvider'
import styles from './edit-menu.module.css'
import EditDataCalculator from './edit-data-calculator/EditDataCalculator'
import ListMenu from './list-menu/ListMenu'
import EditManagement from './edit-management/EditManagement'
import ListGroup from './list-group/ListGroup'
import { useMediaQuery } from '@mantine/hooks'

const EditMenu = () => {
    const media_query = useMediaQuery('(max-width:700px)')
    const { menu_item_copy, setMenuItemId } = useContext(EditMenuContext) as IEditMenuContext

    if (media_query)
        return (
            <div className={`${styles.mobile_menu_wrapper} ${!!menu_item_copy && styles.mobile_menu_wrapper__active}`}>
                {menu_item_copy && (
                    <>
                        <div className={styles.close_elem} onClick={() => setMenuItemId(null)}></div>
                        <div className={styles.mobile_menu}>
                            <ListMenu />
                            <ListGroup />
                            <EditDataCalculator />
                            <EditManagement />
                        </div>
                    </>
                )}
            </div>
        )
    return (
        <Modal size={620} p={10} opened={!!menu_item_copy} onClose={() => setMenuItemId(null)} title="Редактор графика" centered>
            {menu_item_copy && (
                <div className={styles.content}>
                    <EditDataCalculator />
                    <ListGroup />
                    <ListMenu />
                    <EditManagement />
                </div>
            )}
        </Modal>
    )
}
export default EditMenu
