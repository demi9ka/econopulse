import { createContext, useState, FC, ReactNode, useContext, useEffect } from 'react'
import { IChart } from 'interface'
import defaultChart from 'services/defaultChartData'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'
import { IErrorContext, ErrorContext } from 'provider/ErrorProvider'

export interface IChartContext {
    chart: IChart
    setChart: React.Dispatch<React.SetStateAction<IChart>>
    use_line: boolean
    setUseLine: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartContext = createContext<IChartContext | null>(null)

const default_data: IChart = null
const ChartProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { index } = useContext(StructureContext) as IStructureContext
    const { setError } = useContext(ErrorContext) as IErrorContext
    const [chart, setChart] = useState<IChart>(default_data)
    const [use_line, setUseLine] = useState<boolean>(false)

    useEffect(() => {
        const F = async () => {
            if (index) {
                try {
                    const default_data = await defaultChart()
                    if (default_data.data) setChart(default_data.data)
                } catch (e: any) {
                    setError(prev => [...prev, { content: <p>{typeof e === 'string' ? e : 'Не удалось сгенерировать график'}</p> }])
                }
            }
        }
        F()
    }, [index])
    return <ChartContext.Provider value={{ chart, setChart, use_line, setUseLine }}>{children}</ChartContext.Provider>
}

export { ChartProvider, ChartContext }
