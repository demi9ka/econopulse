import { useContext } from 'react'
import StructureItem from './structure-item/StructureItem'
import styles from './structure-list.module.css'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { Button } from '@mantine/core'
import randomColor from 'utils/randomColor'
import { IconPlus } from '@tabler/icons-react'
import getDefaultValue from 'utils/defaultValue'

const StructureList = () => {
    const { structure, index } = useContext(StructureContext) as IStructureContext
    const { setFocusIndex, setModelId } = useContext(EditContext) as IEditContext

    if (index === undefined)
        return (
            <div className={styles.state_wrapper}>
                <p>Загрузка...</p>
            </div>
        )
    else if (index === null) return <></>

    return (
        <div className={styles.item_wrapper}>
            {structure.data.map((_, id) => (
                <StructureItem key={id} id={id} />
            ))}
            <Button
                h={35}
                fullWidth
                mt={10}
                bg={'#228be60c'}
                style={{ border: '1px solid #228be663' }}
                onClick={() => {
                    structure.data!.push(getDefaultValue('Индекс МосБиржи', randomColor()))
                    setModelId(structure.data.length - 1)
                    setFocusIndex(0)
                }}
            >
                <IconPlus width={18} color="#228be6" />
            </Button>
        </div>
    )
}

export default StructureList
