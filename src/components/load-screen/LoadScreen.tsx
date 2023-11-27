import styles from './load-screen.module.css'
import { Loader } from '@mantine/core'

const LoadScreen = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader_wrapper}>
                <Loader color="#4C6EF5" />
                <h3>Загрузка контента</h3>
            </div>
        </div>
    )
}
export default LoadScreen
