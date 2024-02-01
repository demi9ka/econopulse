import CalculationList from './calculator-list/CalculatorList'
import styles from './calculator.module.css'
import { Button, Loader, Menu } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { ICalculationContext, CalculationContext } from 'provider/CalculationProvider'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'
import chartData from 'services/chartData'
import { IChartDataContext, ChartDataContext } from 'provider/ChartDataProvider'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import { IUserDataContext, UserDataContext } from 'provider/UserProvider'
import { IconHexagonLetterR, IconArrowsExchange, IconCheck, IconCircleOff, IconChevronDown, IconChartDots3 } from '@tabler/icons-react'
import { IFavoriteMenuContext, FavoriteMenuContext } from 'provider/FavoriteProvider'

const type_data = {
    roc: ['ROC', <IconHexagonLetterR color="#7950F2" style={{ margin: '0 8px' }} width={20} />],
    overlay: ['Наложить', <IconArrowsExchange color="#FAB005" style={{ margin: '0 8px' }} width={20} />],
}

const Calculator = () => {
    const { setErrorData } = useContext(ErrorContext) as IErrorContext
    const { user_data } = useContext(UserDataContext) as IUserDataContext
    const navigate = useNavigate()
    const { calculation_data, setCalculationData, index } = useContext(CalculationContext) as ICalculationContext
    const { setChartData } = useContext(ChartDataContext) as IChartDataContext
    const media_query = useMediaQuery('(max-width: 550px)')
    const [disabled, setDisabled] = useState(false)
    const { setViewModal } = useContext(FavoriteMenuContext) as IFavoriteMenuContext

    useEffect(() => {
        if (index) setDisabled(false)
        else setDisabled(true)
    }, [index])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div></div>
                    <div>
                        {user_data && (
                            <Button fw={'normal'} px={10} py={0} bg={'#f59f0040'} className={styles.favorite} onClick={() => setViewModal(true)}>
                                <span style={{ marginRight: '10px' }}>Избранное</span>
                                <IconChartDots3 color="#FCC419" width={20} />
                            </Button>
                        )}

                        <Menu position="bottom-end" withArrow shadow="md" width={200}>
                            <Menu.Target>
                                <Button fw={'normal'} mx={15} bg={'#25262b'} rightSection={<IconChevronDown width={14} />}>
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
                            id="button_generate"
                            bg={'#4263EB'}
                            fw={400}
                            w={120}
                            px={media_query ? 30 : 20}
                            disabled={disabled}
                            opacity={disabled ? 0.8 : 1}
                            onClick={async () => {
                                if (!user_data) return navigate('/register')
                                if (calculation_data.data.length) {
                                    setDisabled(true)
                                    try {
                                        const res = await chartData(calculation_data)
                                        if (res.status == 200) setChartData(res.data)
                                    } catch (e: any) {
                                        setErrorData(prev => [...prev, { content: <p>{e}</p> }])
                                    }
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
        </div>
    )
}
export default Calculator
