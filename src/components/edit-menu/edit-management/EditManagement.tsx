import styles from './edit-management.module.css'
import { EditMenuContext, IEditMenuContext } from 'provider/EditMenuProvider'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { useContext } from 'react'
import { ICalculatorItem } from 'interface'

const checkDisableButton = (menu_item_copy: ICalculatorItem | null): boolean => {
    return !!menu_item_copy!.data.filter(item => !Number.isFinite(item.id) || item.action_id === null).length
}

const EditManagement = () => {
    const { setCalculationData, calculation_data } = useContext(CalculationContext) as ICalculationContext
    const { menu_item_copy, menu_item_id, setMenuItemId } = useContext(EditMenuContext) as IEditMenuContext

    return (
        <div className={styles.wrapper}>
            <button
                className={styles.save_btn}
                disabled={checkDisableButton(menu_item_copy!)}
                onClick={() => {
                    calculation_data[menu_item_id!] = menu_item_copy!
                    setCalculationData([...calculation_data])
                    setMenuItemId(null)
                }}
            >
                Сохранить
            </button>
        </div>
    )
}

export default EditManagement
