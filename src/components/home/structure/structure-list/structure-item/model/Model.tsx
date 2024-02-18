import { FC, useContext } from 'react'
import styles from './model.module.css'
import { EditContext, IEditContext } from 'provider/EditProvider'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { IconPencil } from '@tabler/icons-react'
import { decode } from 'utils/writeCode'

const Structure: FC<{ id: number }> = ({ id }) => {
    const { setFocusIndex, setModelId } = useContext(EditContext) as IEditContext
    const { structure, index } = useContext(StructureContext) as IStructureContext
    return (
        <div
            className={styles.wrapper}
            onClick={() => {
                setModelId(id), setFocusIndex(0)
            }}
        >
            <div className={styles.item_wrapper}>{decode(structure.data[id].data, index)}</div>
            <div className={styles.edit_icon}>
                <IconPencil width={18} />
            </div>
        </div>
    )
}
export default Structure
