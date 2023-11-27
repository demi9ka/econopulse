import CalculationList from './calculator-list/CalculatorList'
import styles from './calculator.module.css'
import { Button, Loader } from '@mantine/core'
import { useContext, useState } from 'react'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import getChartData from 'services/getChartData'
import { IChartDataContext, ChartDataContext } from 'provider/ChartDataProvider'
import { useMediaQuery } from '@mantine/hooks'

const Calculator = () => {
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const { setChartData } = useContext(ChartDataContext) as IChartDataContext
    const media_query = useMediaQuery('(max-width: 550px)')
    const [disabled, setDisabled] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Калькулятор значений</h2>
                <Button
                    bg={'#4263EB'}
                    fw={400}
                    w={120}
                    px={media_query ? 30 : 20}
                    disabled={disabled}
                    opacity={disabled ? 0.8 : 1}
                    onClick={async () => {
                        if (calculation_data.length) {
                            setDisabled(true)
                            setChartData(await getChartData(calculation_data))
                            setDisabled(false)
                        }
                    }}
                >
                    {disabled ? <Loader size={20} mr={10} color="#F8F9FA" /> : 'Генерация'}
                </Button>
            </div>

            <CalculationList />
        </div>
    )
}
export default Calculator
