import { FC, useContext, useEffect, useState } from 'react'
import styles from './color-input.module.css'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'

let color_count = 0
const ColorInput: FC<{ id: number }> = ({ id }) => {
    const { calculation_data, setCalculationData } = useContext(CalculationContext) as ICalculationContext
    const [chart_color, setChartColor] = useState(calculation_data[id].color)
    useEffect(() => {
        color_count += 1
        const copy_count = color_count
        setTimeout(() => {
            if (copy_count === color_count) {
                color_count = 0
                calculation_data[id].color = chart_color
                setCalculationData([...calculation_data])
            }
        }, 500)
    }, [chart_color])
    useEffect(() => {
        setChartColor(calculation_data[id].color)
    }, [calculation_data])
    return <input className={styles.color_input} type="color" value={chart_color} title="Цвет графа" onChange={e => setChartColor(e.target.value)} />
}

export default ColorInput
