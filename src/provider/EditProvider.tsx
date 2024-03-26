import { createContext, useState, FC, ReactNode, useEffect, useContext, useRef } from 'react'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'
import { checkValid, decode } from 'utils/writeCode'

type IFocusIndex = number | null
type IListGroup = number

export interface IEditContext {
    inputRef: React.RefObject<HTMLInputElement>
    focus_index: IFocusIndex //id индекса под курсором
    group: IListGroup
    model: string //копия модели
    model_id: number //id модели в structure,
    model_valid: boolean //валидна ли модель
    setGroup: React.Dispatch<React.SetStateAction<IListGroup>>
    setFocusIndex: React.Dispatch<React.SetStateAction<IFocusIndex>>
    setModel: React.Dispatch<React.SetStateAction<string>>
    setModelId: React.Dispatch<React.SetStateAction<number>>
    setModelValid: React.Dispatch<React.SetStateAction<boolean>>
}

const EditContext = createContext<IEditContext | null>(null)
const EditProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [group, setGroup] = useState<IListGroup>(-1)
    const [focus_index, setFocusIndex] = useState<IFocusIndex>(null)
    const { structure, index } = useContext(StructureContext) as IStructureContext
    const [model, setModel] = useState<string>('')
    const [model_id, setModelId] = useState<number>(-1)
    const [model_valid, setModelValid] = useState<boolean>(true)

    useEffect(() => {
        if (model_id < 0) return

        setModel(decode(structure.data[model_id].data, index))
    }, [model_id])

    const input_element = inputRef.current
    useEffect(() => {
        input_element && input_element.focus()
    }, [input_element])

    return <EditContext.Provider value={{ focus_index, model, model_id, model_valid, setModelId, setModelValid, group, setFocusIndex, inputRef, setModel, setGroup }}>{children}</EditContext.Provider>
}

export { EditProvider, EditContext }
