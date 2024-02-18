import { FC } from 'react'
import styles from './structure-item.module.css'
import ColorInput from './color/Color'
import Model from './model/Model'
import ItemManagement from './management/Management'

const StructureItem: FC<{ id: number }> = ({ id }) => {
    return (
        <div className={styles.item}>
            <ColorInput id={id} />
            <Model id={id} />
            <ItemManagement id={id} />
        </div>
    )
}
export default StructureItem
