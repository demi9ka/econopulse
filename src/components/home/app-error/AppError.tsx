import { useContext } from 'react'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'
import styles from './app-error.module.css'
import { IconX } from '@tabler/icons-react'

const AppError = () => {
    const { error_data, setErrorData } = useContext(ErrorContext) as IErrorContext
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {error_data.map((error_item, index) => (
                    <div key={index} className={styles.error}>
                        <p className={styles.error_content}>{error_item.content}</p>
                        <IconX
                            className={styles.cross}
                            onClick={() => {
                                setErrorData(error_data.filter((_, i) => i !== index))
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AppError
