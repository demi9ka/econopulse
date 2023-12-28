import { createContext, useState, FC, ReactNode, useContext, useEffect } from 'react'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import getChartData from 'services/getChartData'
import { IChartData } from 'interface'

export interface IChartDataContext {
    chart_data: IChartData
    setChartData: React.Dispatch<React.SetStateAction<IChartData>>
    use_line: boolean
    setUseLine: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartDataContext = createContext<IChartDataContext | null>(null)

const default_data: IChartData = {
    datasets: [],
    labels: [],
}
const ChartDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const [chart_data, setChartData] = useState<IChartData>(default_data)
    const [use_line, setUseLine] = useState<boolean>(false)

    useEffect(() => {
        const Fun = async () => {
            if (calculation_data.data.length) {
                setChartData(await getChartData(calculation_data))
                setUseLine(calculation_data.type === 'roc')
            }
        }
        Fun()
    }, [])
    return <ChartDataContext.Provider value={{ chart_data, setChartData, use_line, setUseLine }}>{children}</ChartDataContext.Provider>
}

export { ChartDataProvider, ChartDataContext }
