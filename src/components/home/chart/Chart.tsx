import styles from './chart.module.css'
import { Line } from 'react-chartjs-2'
import { IChartDataContext, ChartDataContext } from 'provider/ChartDataProvider'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { useContext } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin)
const options: any = {
    responsive: true,

    scales: {
        y: {
            beginAtZero: true,
            position: 'right',
        },
    },

    plugins: {
        legend: {
            position: 'top' as const,
        },
        annotation: {
            annotations: {
                line1: {
                    type: 'line',
                    yMin: 0,
                    yMax: 0,
                    borderColor: '#868E96',
                    borderWidth: 2,
                },
            },
        },
    },
}
const Chart = () => {
    const { chart_data } = useContext(ChartDataContext) as IChartDataContext

    return <div className={`${styles.wrapper} ${chart_data && styles.active}`}>{chart_data && <Line options={options} data={chart_data} />}</div>
}
export default Chart
