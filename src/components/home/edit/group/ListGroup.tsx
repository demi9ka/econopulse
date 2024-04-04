import { observer } from 'mobx-react-lite'
import styles from './list-group.module.css'
import { useStore } from 'provider/RootStoreProvider'

const ListGroup = () => {
    const {
        struture: { index },
        editor: { group, setGroup },
    } = useStore()
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
export default observer(ListGroup)
