import styles from './edit-management.module.css'
import { EditContext, IEditContext } from 'provider/EditProvider'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { useContext } from 'react'
import { encode } from 'utils/writeCode'

const EditManagement = () => {
    const { setStructure, structure, index } = useContext(StructureContext) as IStructureContext
    const { model, setModelId, model_valid, model_id } = useContext(EditContext) as IEditContext

    return (
        <div className={styles.wrapper}>
            <button
                className={styles.save_btn}
                disabled={!model_valid}
                onClick={() => {
                    structure.data[model_id].data = encode(model, index)
                    setStructure({ ...structure })
                    setModelId(-1)
                }}
            >
                Сохранить
            </button>
        </div>
    )
}

export default EditManagement
