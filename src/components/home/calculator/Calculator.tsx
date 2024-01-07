import CalculationList from './calculator-list/CalculatorList'
import styles from './calculator.module.css'
import { Button, Loader, Menu, MenuItem } from '@mantine/core'
import { useContext, useState } from 'react'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import getChartData from 'services/getChartData'
import { IChartDataContext, ChartDataContext } from 'provider/ChartDataProvider'
import { useMediaQuery } from '@mantine/hooks'
import { IconHexagonLetterR, IconArrowsExchange, IconCheck, IconCircleOff, IconCaretDownFilled, IconBookmark, IconDownload, IconUpload, IconChevronDown } from '@tabler/icons-react'

const type_data = {
    roc: ['ROC', <IconHexagonLetterR color="#7950F2" style={{ margin: '0 8px' }} width={20} />],
    overlay: ['Наложить', <IconArrowsExchange color="#FAB005" style={{ margin: '0 8px' }} width={20} />],
}

const Calculator = () => {
    const { calculation_data, setCalculationData } = useContext(CalculationContext) as ICalculationContext
    const { setChartData } = useContext(ChartDataContext) as IChartDataContext
    const media_query = useMediaQuery('(max-width: 550px)')
    const [disabled, setDisabled] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 className={styles.title}>Калькулятор значений</h2>
                    <Menu withArrow shadow="md" position="bottom-start">
                        <Menu.Target>
                            <Button rightSection={<IconChevronDown width={14} />} px={10} py={0} bg={'#25262b'} title="Закладки" ml={15}>
                                <IconBookmark color="#FCC419" width={20} />
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item p={6} leftSection={<IconDownload width={17} />}>
                                Загрузить из списка
                            </Menu.Item>
                            <Menu.Item p={6} leftSection={<IconUpload width={17} />}>
                                Сохранить текущую
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <div>
                    <Menu position="bottom-end" withArrow shadow="md" width={200}>
                        <Menu.Target>
                            <Button fw={'normal'} bg={'#25262b'} rightSection={<IconChevronDown width={14} />}>
                                {calculation_data.type && (
                                    <>
                                        {type_data[calculation_data.type][0]}
                                        {type_data[calculation_data.type][1]}
                                    </>
                                )}
                                {!calculation_data.type && 'Тип графика'}
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown right={0}>
                            <Menu.Item
                                onClick={() => {
                                    calculation_data.type = null
                                    setCalculationData({ ...calculation_data })
                                }}
                                leftSection={<IconCircleOff width={21} color="#828282" />}
                                rightSection={calculation_data.type == null && <IconCheck color="#51CF66" width={21} />}
                            >
                                None
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    calculation_data.type = 'roc'
                                    setCalculationData({ ...calculation_data })
                                }}
                                leftSection={<IconHexagonLetterR width={21} color="#7950F2" />}
                                rightSection={calculation_data.type == 'roc' && <IconCheck color="#51CF66" width={21} />}
                            >
                                ROC
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    calculation_data.type = 'overlay'
                                    setCalculationData({ ...calculation_data })
                                }}
                                leftSection={<IconArrowsExchange width={21} color="#FAB005" />}
                                rightSection={calculation_data.type == 'overlay' && <IconCheck color="#51CF66" width={21} />}
                            >
                                Наложить
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <Button
                        ml={20}
                        bg={'#4263EB'}
                        fw={400}
                        w={120}
                        px={media_query ? 30 : 20}
                        disabled={disabled}
                        opacity={disabled ? 0.8 : 1}
                        onClick={async () => {
                            if (calculation_data.data.length) {
                                setDisabled(true)
                                setChartData(await getChartData(calculation_data))
                                setDisabled(false)
                            }
                        }}
                    >
                        {disabled ? <Loader size={20} mr={10} color="#F8F9FA" /> : 'Генерация'}
                    </Button>
                </div>
            </div>
            <CalculationList />
        </div>
    )
}
export default Calculator
