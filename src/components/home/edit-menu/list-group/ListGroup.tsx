import styles from './list-group.module.css'
import { useContext } from 'react'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { EditMenuContext, IEditMenuContext } from 'provider/EditMenuProvider'
const ListGroup = () => {
    const { GROUP_DATA } = useContext(CalculationContext) as ICalculationContext
    const { group, setGroup } = useContext(EditMenuContext) as IEditMenuContext

    return (
        <div className={styles.group_wrapper}>
            <div className={`${styles.group_item} ${group === -1 && styles.active}`} onClick={() => setGroup(-1)}>
                Все
            </div>
            {GROUP_DATA.map(([name], i) => (
                <div key={i} className={`${styles.group_item} ${i === group && styles.active}`} onClick={() => setGroup(i)}>
                    {name}
                </div>
            ))}
        </div>
    )
}
export default ListGroup
