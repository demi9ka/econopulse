import { createContext, useState, FC, ReactNode, useEffect, useContext } from 'react'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import { ICalculatorItem } from 'interface'
import cloneDeep from 'lodash/cloneDeep'

type IListSelectedIndex = number | null
type IListSelectedId = number | null
// number - существует
// undefiend - не показывать список
// null - без выбраного элемента

export interface IEditMenuContext {
    list_selected_id: IListSelectedId // id в базе выбраного элемента в ячейке функции
    list_selected_index: IListSelectedIndex // порядковый номер ячейки в функции
    setListSelectedId: React.Dispatch<React.SetStateAction<IListSelectedId>>
    setListSelectedIndex: React.Dispatch<React.SetStateAction<IListSelectedIndex>>

    menu_item_id: number | null // id редактируемого элемента в calculation_data
    menu_item_copy: null | ICalculatorItem // копия редактируемового элемента
    setMenuItemId: React.Dispatch<React.SetStateAction<number | null>>
    setMenuItemCopy: React.Dispatch<React.SetStateAction<null | ICalculatorItem>>
}

const EditMenuContext = createContext<IEditMenuContext | null>(null)
const EditMenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [list_selected_id, setListSelectedId] = useState<IListSelectedId>(null)
    const [list_selected_index, setListSelectedIndex] = useState<IListSelectedIndex>(null)
    const [menu_item_id, setMenuItemId] = useState<number | null>(null)
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const [menu_item_copy, setMenuItemCopy] = useState<null | ICalculatorItem>(null)
    useEffect(() => {
        if (Number.isFinite(menu_item_id)) {
            setMenuItemCopy(cloneDeep(calculation_data.data[menu_item_id!]))
        } else {
            setMenuItemCopy(null)
        }
    }, [menu_item_id])

    return <EditMenuContext.Provider value={{ list_selected_id, list_selected_index, menu_item_copy, menu_item_id, setListSelectedId, setListSelectedIndex, setMenuItemCopy, setMenuItemId }}>{children}</EditMenuContext.Provider>
}

export { EditMenuProvider, EditMenuContext }
