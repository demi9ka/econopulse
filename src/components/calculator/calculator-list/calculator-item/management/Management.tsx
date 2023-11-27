import { FC, useContext } from 'react'
import styles from './management.module.css'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { IEditMenuContext, EditMenuContext } from 'provider/EditMenuProvider'
import { IconX, IconDots, IconSwitchVertical, IconHexagonLetterR, IconArrowsExchange } from '@tabler/icons-react'
import { Menu, Switch } from '@mantine/core'
import getDefaultValue from 'utils/getDefaultValue'

const ItemManagement: FC<{ id: number }> = ({ id }) => {
    const { calculation_data, setCalculationData, INDEX_DATA } = useContext(CalculationContext) as ICalculationContext
    const { setListSelectedId, setMenuItemId, setListSelectedIndex } = useContext(EditMenuContext) as IEditMenuContext
    return (
        <div className={styles.wrapper}>
            {calculation_data[id].reverse ? <IconSwitchVertical width={25} height={25} className={styles.option_icon} color="#40C057" /> : ''}
            {calculation_data[id].roc ? <IconHexagonLetterR width={25} height={25} className={styles.option_icon} color="#7950F2" /> : ''}
            {calculation_data[id].overlay ? <IconArrowsExchange width={25} height={25} className={styles.option_icon} color="#FAB005" /> : ''}
            <Menu width={180} trigger="hover" openDelay={200} closeDelay={400} position="top-end" withArrow>
                <Menu.Target>
                    <IconDots className={styles.icon}></IconDots>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Опции графика</Menu.Label>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={calculation_data[id].reverse} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconSwitchVertical width={17} />}
                        onClick={() => {
                            setCalculationData(prev => {
                                prev[id].reverse = !prev[id].reverse
                                return [...prev]
                            })
                        }}
                    >
                        Реверс
                    </Menu.Item>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={calculation_data[id].roc} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconHexagonLetterR width={17} />}
                        onClick={() => {
                            setCalculationData(prev => {
                                prev[id].roc = !prev[id].roc
                                prev[id].overlay = false
                                return [...prev]
                            })
                        }}
                    >
                        ROC
                    </Menu.Item>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={calculation_data[id].overlay} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconArrowsExchange width={17} />}
                        onClick={() => {
                            setCalculationData(prev => {
                                prev[id].overlay = !prev[id].overlay
                                prev[id].roc = false
                                return [...prev]
                            })
                        }}
                    >
                        Наложить
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <IconX
                color="#FA5252"
                onClick={() => {
                    const update_calculation_data = calculation_data.filter((_, i) => i !== id)
                    if (!update_calculation_data.length) {
                        update_calculation_data.push(getDefaultValue(INDEX_DATA[0][0]))
                        setCalculationData(update_calculation_data)
                        setMenuItemId(0)
                        setListSelectedId(0)
                        setListSelectedIndex(0)
                    } else {
                        setCalculationData(update_calculation_data)
                    }
                }}
                className={styles.icon}
            />
        </div>
    )
}
export default ItemManagement
