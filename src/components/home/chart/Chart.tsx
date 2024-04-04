import styles from './chart.module.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { useStore } from 'provider/RootStoreProvider'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin)

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
const Chart = () => {
    const { chart, error } = useStore()

    useEffect(() => {
        const f = async () => {
            const res = await chart.loadDefaultChart()
            if (res) error.addError(res)
        }
        f()
    }, [])
    return (
        <div className={`${styles.wrapper} ${chart && styles.active}`}>
            {chart.is_loaded && (
                <div className={styles.chart_box}>
                    <Line options={options} data={chart.chart} />
                </div>
            )}
        </div>
    )
}
export default observer(Chart)
