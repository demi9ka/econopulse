import { createContext, useState, FC, ReactNode, useEffect } from 'react'
import { ICalculatorData } from 'interface'
import getIndexData from 'utils/getIndexData'
import getDefaultValue from 'utils/getDefaultValue'

export interface ICalculationContext {
    calculation_data: ICalculatorData
    setCalculationData: React.Dispatch<React.SetStateAction<ICalculatorData>>
    INDEX_DATA: [string, string][]
    ACTION_DATA: string[]
    GROUP_DATA: [string, number[]][]
}

const CalculationContext = createContext<ICalculationContext | null>(null)

const CalculationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    useEffect(() => {
        const F = async () => {
            const res = await getIndexData()
            setData(res)
        }
        F()
    }, [])
    const local_data_buffer = JSON.parse(localStorage.getItem('calculation_data')!)
    const [data, setData] = useState<[[string, string][], string[], [string, number[]][]]>([[], [], []])
    const [calculation_data, setCalculationData] = useState<ICalculatorData>(
        local_data_buffer || {
            crop_id: null,
            data: [getDefaultValue('Индекс МосБиржи')],
            type: null,
        }
    )
    useEffect(() => localStorage.setItem('calculation_data', JSON.stringify(calculation_data)), [calculation_data])

    return <CalculationContext.Provider value={{ calculation_data, setCalculationData, INDEX_DATA: data[0], ACTION_DATA: data[1], GROUP_DATA: data[2] }}>{children}</CalculationContext.Provider>
}

export { CalculationProvider, CalculationContext }
