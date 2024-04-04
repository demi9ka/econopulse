import styles from './error.module.css'
import { IconX } from '@tabler/icons-react'
import { useStore } from 'provider/RootStoreProvider'

const AppError = () => {
    const {
        error: { deleteError, error },
    } = useStore()
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {error.map((error_item, index) => (
                    <div key={index} className={styles.error}>
                        <div className={styles.error_content}>{error_item}</div>
                        <IconX className={styles.cross} onClick={() => deleteError(index)} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AppError
