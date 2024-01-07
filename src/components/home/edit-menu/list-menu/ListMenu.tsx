import { useContext, useEffect, useState } from 'react'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
// import { IconLink } from '@tabler/icons-react'

import styles from './list-menu.module.css'

type IListData = number[]

const ListMenu = () => {
    const { INDEX_DATA, GROUP_DATA } = useContext(CalculationContext) as ICalculationContext
    const { list_selected_id, menu_item_copy, list_selected_index, setMenuItemCopy, setListSelectedId, group } = useContext(EditMenuContext) as IEditMenuContext

    const [list_data, setListData] = useState<IListData>([])
    useEffect(() => (group >= 0 ? setListData(GROUP_DATA[group][1]) : setListData(INDEX_DATA.map((_, i) => i))), [group])
    return (
        <div className={styles.list_wrapper}>
            {list_data.map(id => (
                <div
                    key={id}
                    className={`${styles.list_item} ${list_selected_id === id && styles.list_item__active}`}
                    onClick={() => {
                        menu_item_copy!.data[list_selected_index!].id = id
                        setMenuItemCopy(menu_item_copy!)
                        setListSelectedId(id)
                    }}
                >
                    <p className={styles.sec_code}>{INDEX_DATA[id][0]}</p>
                    <p className={styles.full_name}>{INDEX_DATA[id][1]}</p>
                </div>
            ))}
        </div>
    )
}
export default ListMenu
