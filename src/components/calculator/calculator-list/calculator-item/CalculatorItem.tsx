import { FC } from 'react'
import styles from './calculator-item.module.css'
import ColorInput from './color-input/ColorInput'
import DataCalculator from './data-calculator/DataCalculator'
import ItemManagement from './management/Management'

interface ICalculationItemProps {
    id: number
}

const CalculationItem: FC<ICalculationItemProps> = ({ id }) => {
    return (
        <div className={styles.item}>
            <ColorInput id={id} />
            <DataCalculator id={id} />
            <ItemManagement id={id} />
        </div>
    )
}
export default CalculationItem
