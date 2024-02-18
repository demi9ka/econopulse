import StructureList from './structure-list/StructureList'
import styles from './structure.module.css'
import { Button, Loader, Menu } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'
import chart from 'services/chartData'
import { IChartContext, ChartContext } from 'provider/ChartProvider'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import { IUserContext, UserContext } from 'provider/UserProvider'
import { IconHexagonLetterR, IconArrowsExchange, IconCheck, IconCircleOff, IconChevronDown, IconChartDots3, IconCircleCheck } from '@tabler/icons-react'
import { IFavoriteContext, FavoriteContext } from 'provider/FavoriteProvider'
import { updateDate } from 'services/indexData'

const type_data = {
    roc: ['ROC', <IconHexagonLetterR color="#7950F2" style={{ margin: '0 8px' }} width={20} />],
    overlay: ['Наложить', <IconArrowsExchange color="#FAB005" style={{ margin: '0 8px' }} width={20} />],
}

const Structure = () => {
    const { setError } = useContext(ErrorContext) as IErrorContext
    const { user } = useContext(UserContext) as IUserContext
    const navigate = useNavigate()
    const { structure, setStructure, index } = useContext(StructureContext) as IStructureContext
    const { setChart } = useContext(ChartContext) as IChartContext
    const media_query = useMediaQuery('(max-width: 550px)')
    const [disabled, setDisabled] = useState(false)
    const { setOpened } = useContext(FavoriteContext) as IFavoriteContext
    const [update_date, setUpdateDate] = useState<Date | null>(null)
    const [update_date_string, setUpdateDateString] = useState<string>('')
    const { model_id } = useContext(EditContext) as IEditContext

    useEffect(() => {
        if (index) setDisabled(false)
        else setDisabled(true)
    }, [index])

    useEffect(() => {
        const F = async () => {
            const res = await updateDate()
            if (res.status !== 200) return
            const update_date_res = new Date(res.data.date)
            setUpdateDate(update_date_res)
        }
        F()
    }, [])

    useEffect(() => {
        if (!update_date) return
        const current_date = new Date()
        let delta = (current_date.getTime() - update_date.getTime()) / 1000 / 60
        if (delta < 60) setUpdateDateString(`${delta.toFixed(0)}мин`)
        else if (delta < 1440) setUpdateDateString(`${(delta / 60).toFixed(0)}ч`)
        else setUpdateDateString(`${(delta / 1440).toFixed(0)}дн`)
    }, [update_date, model_id])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        {user && (
                            <Button fw={'normal'} px={10} py={0} bg={'#f59f0040'} className={styles.favorite} onClick={() => setOpened(true)}>
                                <span style={{ marginRight: '10px' }}>Избранное</span>
                                <IconChartDots3 color="#FCC419" width={20} />
                            </Button>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {update_date && (
                            <div className={styles.update_date} title="Обновление графиков">
                                <IconCircleCheck color="#94D82D" />
                                <p>{update_date_string} </p>
                            </div>
                        )}

                        <Menu position="bottom-end" withArrow shadow="md" width={200}>
                            <Menu.Target>
                                <Button fw={'normal'} mx={15} bg={'#25262b'} rightSection={<IconChevronDown width={14} />}>
                                    {structure.type && (
                                        <>
                                            {type_data[structure.type][0]}
                                            {type_data[structure.type][1]}
                                        </>
                                    )}
                                    {!structure.type && 'Тип графика'}
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown right={0}>
                                <Menu.Item
                                    onClick={() => {
                                        structure.type = null
                                        setStructure({ ...structure })
                                    }}
                                    leftSection={<IconCircleOff width={21} color="#828282" />}
                                    rightSection={structure.type == null && <IconCheck color="#51CF66" width={21} />}
                                >
                                    None
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        structure.type = 'roc'
                                        setStructure({ ...structure })
                                    }}
                                    leftSection={<IconHexagonLetterR width={21} color="#7950F2" />}
                                    rightSection={structure.type == 'roc' && <IconCheck color="#51CF66" width={21} />}
                                >
                                    ROC
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        structure.type = 'overlay'
                                        setStructure({ ...structure })
                                    }}
                                    leftSection={<IconArrowsExchange width={21} color="#FAB005" />}
                                    rightSection={structure.type == 'overlay' && <IconCheck color="#51CF66" width={21} />}
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
                                if (!user) return navigate('/register')
                                if (structure.data.length) {
                                    setDisabled(true)
                                    try {
                                        const res = await chart(structure)
                                        if (res.status == 200) setChart(res.data)
                                    } catch (e: any) {
                                        setError(prev => [...prev, { content: <p>{e}</p> }])
                                    }
                                    setDisabled(false)
                                }
                            }}
                        >
                            {disabled ? <Loader size={20} mr={10} color="#F8F9FA" /> : 'Генерация'}
                        </Button>
                    </div>
                </div>
                <StructureList />
            </div>
        </div>
    )
}
export default Structure
