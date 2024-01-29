import { createContext, useState, FC, ReactNode, useContext, useEffect } from 'react'
import { IChartData } from 'interface'
import defaultChartData from 'services/defaultChartData'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import { IErrorContext, ErrorContext } from 'provider/ErrorProvider'

export interface IChartDataContext {
    chart_data: IChartData
    setChartData: React.Dispatch<React.SetStateAction<IChartData>>
    use_line: boolean
    setUseLine: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartDataContext = createContext<IChartDataContext | null>(null)

const default_data: IChartData = null
const ChartDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { index } = useContext(CalculationContext) as ICalculationContext
    const { setErrorData } = useContext(ErrorContext) as IErrorContext
    const [chart_data, setChartData] = useState<IChartData>(default_data)
    const [use_line, setUseLine] = useState<boolean>(false)

    useEffect(() => {
        const F = async () => {
            if (index) {
                try {
                    const default_data = await defaultChartData()
                    if (default_data.data) setChartData(default_data.data)
                } catch (e: any) {
                    setErrorData(prev => [...prev, { content: <p>{typeof e === 'string' ? e : 'Не удалось сгенерировать график'}</p> }])
                }
            }
        }
        F()
    }, [index])
    return <ChartDataContext.Provider value={{ chart_data, setChartData, use_line, setUseLine }}>{children}</ChartDataContext.Provider>
}

export { ChartDataProvider, ChartDataContext }
