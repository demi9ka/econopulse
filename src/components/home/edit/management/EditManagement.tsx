import { useStore } from 'provider/RootStoreProvider'
import styles from './edit-management.module.css'
import { encode } from 'utils/writeCode'
import { observer } from 'mobx-react-lite'

const EditManagement = () => {
    const {
        struture: { structure, index, setStructure },
        editor: { model, setModelId, model_valid, model_id },
    } = useStore()

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

export default observer(EditManagement)
