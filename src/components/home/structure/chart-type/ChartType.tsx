import { Menu } from '@mantine/core'
import { IconArrowsExchange, IconCheck, IconChevronDown, IconCircleOff, IconHexagonLetterR } from '@tabler/icons-react'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'
import styles from './chart-type.module.css'
import { useContext } from 'react'

const type_data = {
    roc: ['ROC', <IconHexagonLetterR color="#7950F2" style={{ margin: '0 8px' }} width={20} />],
    overlay: ['Наложить', <IconArrowsExchange color="#FAB005" style={{ margin: '0 8px' }} width={20} />],
}

const ChartType = () => {
    const { structure, setStructure } = useContext(StructureContext) as IStructureContext
    return (
        <Menu position="bottom-end" withArrow shadow="md" width={200}>
            <Menu.Target>
                <button className={styles.btn}>
                    {structure.type && (
                        <>
                            {type_data[structure.type][0]}
                            {type_data[structure.type][1]}
                        </>
                    )}
                    {!structure.type && 'Тип графика'}
                    <IconChevronDown width={14} />
                </button>
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
    )
}
export default ChartType
