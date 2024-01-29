import { createContext, useState, FC, ReactNode, useEffect, useContext } from 'react'
import { ICalculatorData, IIndex } from 'interface'
import getDefaultValue from 'utils/defaultValue'
import indexData from 'services/indexData'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'

export interface ICalculationContext {
    calculation_data: ICalculatorData
    setCalculationData: React.Dispatch<React.SetStateAction<ICalculatorData>>
    index: IIndex
    loadIndexData: () => Promise<void>
}

const CalculationContext = createContext<ICalculationContext | null>(null)

const CalculationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [index, setIndex] = useState<ICalculationContext['index']>(undefined)
    const { setErrorData } = useContext(ErrorContext) as IErrorContext
    const [calculation_data, setCalculationData] = useState<ICalculatorData>({
        crop_id: null,
        data: [getDefaultValue('Индекс МосБиржи')],
        type: null,
    })
    const loadIndexData = async () => {
        try {
            const res = await indexData()
            if (res.data) setIndex({ ...res.data, action: ['+', '-', '*', '/'] })
            else throw 'Произошла ошибка'
        } catch (e: any) {
            setIndex(null)

            setErrorData(prev => [
                ...prev,
                {
                    content: (
                        <>
                            {typeof e === 'string' ? e : 'Не удалось загрузить индексы'}
                            {typeof e === 'string' && (
                                <span
                                    className="error_link"
                                    onClick={() => {
                                        setErrorData(prev => prev.filter((_, i) => i !== prev.length - 1))
                                        loadIndexData()
                                    }}
                                >
                                    Попробывать ещё раз
                                </span>
                            )}
                        </>
                    ),
                },
            ])
        }
    }
    useEffect(() => {
        loadIndexData()
    }, [])

    return <CalculationContext.Provider value={{ calculation_data, setCalculationData, index, loadIndexData }}>{children}</CalculationContext.Provider>
}

export { CalculationProvider, CalculationContext }
