import { useContext } from 'react'
import CalculationItem from './calculator-item/CalculatorItem'
import styles from './calculator-list.module.css'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { Button } from '@mantine/core'
import getRandomColor from 'utils/randomColor'
import { IconPlus } from '@tabler/icons-react'
import getDefaultValue from 'utils/defaultValue'

const CalculationList = () => {
    const { calculation_data, index } = useContext(CalculationContext) as ICalculationContext
    const { setMenuItemId, setListSelectedId, setListSelectedIndex } = useContext(EditMenuContext) as IEditMenuContext

    if (index === undefined)
        return (
            <div className={styles.state_wrapper}>
                <p>Загрузка...</p>
            </div>
        )
    else if (index === null) return <></>

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
                    calculation_data.data!.push(getDefaultValue(index!.data[0].long_name, getRandomColor()))
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
