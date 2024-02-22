import { createContext, useState, FC, ReactNode, useEffect, useContext } from 'react'
import { IStructure, IIndex } from 'interface'
import defaultValue from 'utils/defaultValue'
import getIndex from 'services/indexData'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'

export interface IStructureContext {
    structure: IStructure
    setStructure: React.Dispatch<React.SetStateAction<IStructure>>
    index: IIndex
    loadIndex: () => Promise<void>
}

const StructureContext = createContext<IStructureContext | null>(null)

const StructureProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [index, setIndex] = useState<IStructureContext['index']>(undefined)
    const { setError } = useContext(ErrorContext) as IErrorContext
    const [structure, setStructure] = useState<IStructure>({
        crop_id: null,
        data: [defaultValue()],
        type: null,
    })
    const loadIndex = async () => {
        try {
            const res = await getIndex()
            if (res.data) setIndex({ ...res.data, action: ['+', '-', '*', '/'] })
            else throw 'Произошла ошибка'
        } catch (e: any) {
            setIndex(null)
            setError(prev => [
                ...prev,
                {
                    content: (
                        <>
                            {typeof e === 'string' ? e : 'Не удалось загрузить индексы'}
                            {typeof e === 'string' && (
                                <span
                                    className="error_link"
                                    onClick={() => {
                                        setError(prev => prev.filter((_, i) => i !== prev.length - 1))
                                        loadIndex()
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
        loadIndex()
    }, [])

    return <StructureContext.Provider value={{ structure, setStructure, index, loadIndex }}>{children}</StructureContext.Provider>
}

export { StructureProvider, StructureContext }
