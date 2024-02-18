import { Modal } from '@mantine/core'
import { useContext } from 'react'

import { EditContext, IEditContext } from 'provider/EditProvider'
import styles from './edit.module.css'
import ListIndex from './index/ListIndex'
import EditManagement from './management/EditManagement'
import ListGroup from './group/ListGroup'
import { useMediaQuery } from '@mantine/hooks'
import CodeInput from './input/CodeInput'

const Edit = () => {
    const media_query = useMediaQuery('(max-width:700px)')
    const { model_id, setModelId } = useContext(EditContext) as IEditContext
    if (model_id < 0) return <></>
    if (media_query)
        return (
            <div className={`${styles.mobile_menu_wrapper} ${model_id >= 0 && styles.mobile_menu_wrapper__active}`}>
                {model_id >= 0 && (
                    <>
                        <div className={styles.close_elem} onClick={() => setModelId(-1)}></div>
                        <div className={styles.mobile_menu}>
                            <ListIndex />
                            <ListGroup />
                            <CodeInput />
                            <EditManagement />
                        </div>
                    </>
                )}
            </div>
        )
    return (
        <Modal size={620} p={10} opened={model_id >= -1} onClose={() => setModelId(-1)} title="Редактор модели" centered>
            <div className={styles.content}>
                <CodeInput />
                <ListGroup />
                <ListIndex />
                <EditManagement />
            </div>
        </Modal>
    )
}
export default Edit
