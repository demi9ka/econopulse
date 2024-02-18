import styles from './list-group.module.css'
import { useContext } from 'react'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { EditContext, IEditContext } from 'provider/EditProvider'
const ListGroup = () => {
    const { index } = useContext(StructureContext) as IStructureContext
    const { group, setGroup } = useContext(EditContext) as IEditContext

    return (
        <div className={styles.group_wrapper}>
            <div className={`${styles.group_item} ${group === -1 && styles.active}`} onClick={() => setGroup(-1)}>
                Все
            </div>
            {index!.group.map(([name], i) => (
                <div key={i} className={`${styles.group_item} ${i === group && styles.active}`} onClick={() => setGroup(i)}>
                    {name}
                </div>
            ))}
        </div>
    )
}
export default ListGroup
