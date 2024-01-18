import { useContext, useEffect, useState } from 'react'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'

import styles from './list-menu.module.css'

type IListData = number[]

const ListMenu = () => {
    const { index } = useContext(CalculationContext) as ICalculationContext

    const { list_selected_id, menu_item_copy, list_selected_index, setMenuItemCopy, setListSelectedId, group } = useContext(EditMenuContext) as IEditMenuContext
    const [list_data, setListData] = useState<IListData>([])
    useEffect(() => (group >= 0 ? setListData(index!.group[group][1]) : setListData(index!.data.map((_, i) => i))), [group])
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
                    <p className={styles.full_name}>{index!.data[id].long_name}</p>
                    <p className={styles.sec_code}>{index!.data[id].short_name}</p>
                </div>
            ))}
        </div>
    )
}
export default ListMenu
