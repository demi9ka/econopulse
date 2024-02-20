import { FC, useContext } from 'react'
import styles from './management.module.css'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { IconX, IconDots, IconSwitchVertical, IconScissors } from '@tabler/icons-react'
import { Menu, Switch } from '@mantine/core'
import defaultValue from 'utils/defaultValue'
import { IStructure } from 'interface'

const ItemManagement: FC<{ id: number }> = ({ id }) => {
    const { structure, setStructure, index } = useContext(StructureContext) as IStructureContext
    const { setFocusIndex, setModelId } = useContext(EditContext) as IEditContext

    return (
        <div className={styles.wrapper}>
            {structure.data[id].reverse && <IconSwitchVertical width={25} height={25} className={styles.option_icon} color="#40C057" />}
            {structure.crop_id === id && <IconScissors width={25} height={25} className={styles.option_icon} color="#E64980" />}
            <Menu width={180} trigger="hover" openDelay={200} closeDelay={400} position="top-end" withArrow>
                <Menu.Target>
                    <IconDots className={styles.icon}></IconDots>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={structure.data[id].reverse} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconSwitchVertical width={17} />}
                        onClick={() => {
                            setStructure(prev => {
                                prev.data[id].reverse = !prev.data[id].reverse

                                return { ...prev }
                            })
                        }}
                    >
                        Реверс
                    </Menu.Item>
                    <Menu.Item
                        py={5}
                        px={5}
                        closeMenuOnClick={false}
                        rightSection={<Switch checked={structure.crop_id === id} style={{ pointerEvents: 'none' }} size="xs" />}
                        leftSection={<IconScissors width={17} />}
                        onClick={() => {
                            setStructure(prev => {
                                if (prev.crop_id === id) prev.crop_id = null
                                else prev.crop_id = id
                                return { ...prev }
                            })
                        }}
                    >
                        Обрезать
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <IconX
                color="#FA5252"
                onClick={() => {
                    const update_structure: IStructure = {
                        ...structure,
                        data: structure.data.filter((_, i) => i !== id),
                    }
                    if (!update_structure.data.length) {
                        update_structure.data.push({
                            color: '#F8F9FA',
                            data: '',
                            reverse: false,
                        })
                        setStructure(update_structure)
                        setFocusIndex(0)
                        setModelId(0)
                    } else {
                        setStructure(update_structure)
                    }
                }}
                className={styles.icon}
            />
        </div>
    )
}
export default ItemManagement
