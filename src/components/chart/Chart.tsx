import styles from './chart.module.css'
import { Line } from 'react-chartjs-2'
import { IChartDataContext, ChartDataContext } from 'provider/ChartDataProvider'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { useContext, useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin)

const annotation = {
    annotations: {
        line1: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: '#868E96',
            borderWidth: 2,
        },
    },
}
const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
}
const options_with_line = {
    ...options,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        annotation,
    },
}

const Chart = () => {
    const { chart_data } = useContext(ChartDataContext) as IChartDataContext
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const [use_line, setUseLine] = useState(false)
    useEffect(() => {
        let res = false
        for (const item of calculation_data) {
            if (item.roc) {
                res = true
                break
            }
        }
        setUseLine(res)
    }, [chart_data])
    return (
        <div className={styles.wrapper}>
            <Line options={use_line ? options_with_line : options} data={chart_data} />
        </div>
    )
}
export default Chart
