import styles from './chart.module.css'
import { Line } from 'react-chartjs-2'
import { IChartContext, ChartContext } from 'provider/ChartProvider'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { useContext } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin)

// crossRot'
// 'dash'
// 'line'
// 'rect'
// 'rectRounded'
// 'rectRot'
// 'star'
// 'triangle'
const Chart = () => {
    const { chart } = useContext(ChartContext) as IChartContext
    const options: any = {
        responsive: true,

        scales: {
            y: {
                beginAtZero: true,
                position: 'right',
            },
        },
        borderWidth: 0.8,
        pointBorderWidth: 0.1,
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

    return (
        <div className={`${styles.wrapper} ${chart && styles.active}`}>
            {chart && (
                <div className={styles.chart_box}>
                    <Line options={options} data={chart} />
                </div>
            )}
        </div>
    )
}
export default Chart
