import { createContext, useState, FC, ReactNode } from 'react'
import { IChartData } from 'interface'

export interface IChartDataContext {
    chart_data: IChartData
    setChartData: React.Dispatch<React.SetStateAction<IChartData>>
    use_line: boolean
    setUseLine: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartDataContext = createContext<IChartDataContext | null>(null)

const default_data: IChartData = null
const ChartDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [chart_data, setChartData] = useState<IChartData>(default_data)
    const [use_line, setUseLine] = useState<boolean>(false)
    return <ChartDataContext.Provider value={{ chart_data, setChartData, use_line, setUseLine }}>{children}</ChartDataContext.Provider>
}

export { ChartDataProvider, ChartDataContext }

// useEffect(() => {
//     const Fun = async () => {
//         if (calculation_data.data.length) {
//             setChartData(await getChartData(calculation_data))
//             setUseLine(calculation_data.type === 'roc')
//         }
//     }
//     Fun()
// }, [])
