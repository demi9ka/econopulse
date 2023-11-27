import { useContext } from 'react'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import { IconLink } from '@tabler/icons-react'

import styles from './list-menu.module.css'

const ListMenu = () => {
    const { INDEX_DATA } = useContext(CalculationContext) as ICalculationContext
    const { list_selected_id, menu_item_copy, list_selected_index, setMenuItemCopy, setListSelectedId } = useContext(EditMenuContext) as IEditMenuContext
    return (
        <div className={styles.list_wrapper}>
            {INDEX_DATA.map((_, id) => (
                <div
                    key={id}
                    className={`${styles.list_item} ${list_selected_id === id && styles.list_item__active}`}
                    onClick={() => {
                        menu_item_copy!.data[list_selected_index!].id = id
                        setMenuItemCopy(menu_item_copy!)
                        setListSelectedId(id)
                    }}
                >
                    <a className={styles.link} href={`https://www.moex.com/ru/index/${INDEX_DATA[id][0]}`} target="_blank">
                        <IconLink width={18} />
                    </a>
                    <p className={styles.sec_code}>{INDEX_DATA[id][0]}</p>
                    <p className={styles.full_name}>{INDEX_DATA[id][1]}</p>
                </div>
            ))}
        </div>
    )
}
export default ListMenu
