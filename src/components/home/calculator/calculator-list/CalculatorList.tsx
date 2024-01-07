import { useContext } from 'react'
import CalculationItem from './calculator-item/CalculatorItem'
import styles from './calculator-list.module.css'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { Button } from '@mantine/core'
import getRandomColor from 'utils/getRandomColor'
import { IconPlus } from '@tabler/icons-react'
import getDefaultValue from 'utils/getDefaultValue'

const CalculationList = () => {
    const { calculation_data, INDEX_DATA } = useContext(CalculationContext) as ICalculationContext
    const { setMenuItemId, setListSelectedId, setListSelectedIndex } = useContext(EditMenuContext) as IEditMenuContext
    return (
        <div className={styles.item_wrapper}>
            {calculation_data.data.map((_, id) => (
                <CalculationItem key={id} id={id} />
            ))}
            <Button
                h={35}
                fullWidth
                mt={10}
                bg={'#228be60c'}
                style={{ border: '1px solid #228be663' }}
                onClick={() => {
                    calculation_data.data!.push(getDefaultValue(INDEX_DATA[0][0], getRandomColor()))
                    setMenuItemId(calculation_data.data.length - 1)
                    setListSelectedIndex(0)
                    setListSelectedId(0)
                }}
            >
                <IconPlus width={18} color="#228be6" />
            </Button>
        </div>
    )
}

export default CalculationList
