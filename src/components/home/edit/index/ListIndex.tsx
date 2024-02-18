import { useContext, useEffect, useState } from 'react'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'

import styles from './list-index.module.css'

type IList = number[]

const List = () => {
    const { index } = useContext(StructureContext) as IStructureContext

    const { group, inputRef, model_id, focus_index, setModel, setFocusIndex, model } = useContext(EditContext) as IEditContext
    const [list, setList] = useState<IList>([])
    useEffect(() => (group >= 0 ? setList(index!.group[group][1]) : setList(index!.data.map(el => el.id))), [group])

    return (
        <div className={styles.list_wrapper}>
            {list.map(id => {
                const el = index!.data.find(el => el.id === id)!
                return (
                    <div
                        key={id}
                        className={`${styles.item} ${focus_index === id && styles.active}`}
                        onClick={() => {
                            const inputElement = inputRef.current
                            if (!inputElement) return
                            const currentPosition = inputElement!.selectionStart as number
                            if (!isFinite(currentPosition) || model_id < 0) return

                            setModel(prev => (model.length ? prev!.slice(0, currentPosition) + el.short_name + prev!.slice(currentPosition, prev.length) : el.short_name))

                            setFocusIndex(id)
                            inputElement!.focus()
                            inputElement!.setSelectionRange(currentPosition, currentPosition + 1)
                        }}
                    >
                        <p className={styles.full_name}>{el.long_name}</p>
                        <p className={styles.sec_code}>{el.short_name}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default List
