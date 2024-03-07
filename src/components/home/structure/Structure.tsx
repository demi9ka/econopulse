import StructureList from './structure-list/StructureList'
import styles from './structure.module.css'
import ChartType from './chart-type/ChartType'
import GenerateBtn from './generate-btn/GenerateBtn'
import FavoriteBtn from './favorite-btn/FavoriteBtn'
import { useMediaQuery } from '@mantine/hooks'
import UpdateDate from './update-date/UpdateDate'

const Structure = () => {
    const is_mobile = useMediaQuery(`(max-width: 550px)`)
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {is_mobile ? (
                    <div className={styles.mobile_header}>
                        <div className={styles.block}>
                            <FavoriteBtn />
                            <ChartType />
                        </div>
                        <div className={styles.block}>
                            <UpdateDate />
                            <GenerateBtn />
                        </div>
                    </div>
                ) : (
                    <div className={styles.header}>
                        <FavoriteBtn />
                        <div className={styles.right_part}>
                            <ChartType />
                            <UpdateDate />
                            <GenerateBtn />
                        </div>
                    </div>
                )}
                <StructureList />
            </div>
        </div>
    )
}
export default Structure
