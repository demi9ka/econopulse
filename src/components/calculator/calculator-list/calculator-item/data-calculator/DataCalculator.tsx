import { FC, useContext } from 'react'
import styles from './data-calculator.module.css'

import { EditMenuContext, IEditMenuContext } from 'provider/EditMenuProvider'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { IconPencil } from '@tabler/icons-react'

const DataCalculator: FC<{ id: number }> = ({ id }) => {
    const { setMenuItemId, setListSelectedIndex, setListSelectedId } = useContext(EditMenuContext) as IEditMenuContext
    const { calculation_data, INDEX_DATA, ACTION_DATA } = useContext(CalculationContext) as ICalculationContext
    return (
        <div
            className={`${styles.wrapper} ${styles.cursor_pointer} ${styles.view_wrapper}`}
            onClick={() => {
                setMenuItemId(id), setListSelectedIndex(0), setListSelectedId(calculation_data.data[id].data[0].id)
            }}
        >
            {calculation_data.data[id].data.map((item, id) => (
                <div key={id} className={styles.item_wrapper}>
                    <div title={INDEX_DATA[item.id!][1]} className={styles.item}>
                        {Number.isFinite(item.id) ? INDEX_DATA[item.id!][0] : ''}
                    </div>
                    {item.action_id === undefined ? '' : <div className={styles.action}>{Number.isFinite(item.action_id) ? ACTION_DATA[item.action_id!][0] : ''}</div>}
                </div>
            ))}
            <div className={styles.edit_icon}>
                <IconPencil width={18} />
            </div>
        </div>
    )
}
export default DataCalculator
