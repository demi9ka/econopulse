import { useContext, useEffect, useState } from 'react'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'

import styles from './list-index.module.css'

type IList = number[]

const List = () => {
    const { index } = useContext(StructureContext) as IStructureContext

    const { group, inputRef, focus_index, setModel, setFocusIndex, model } = useContext(EditContext) as IEditContext
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
                            const match = model.match(/\b\w+\b/g)
                            let complete = false
                            if (match !== null) {
                                match.forEach(word => {
                                    if (currentPosition >= model.indexOf(word) && currentPosition <= model.indexOf(word) + word.length) {
                                        setModel(prev => prev.replace(word, el.short_name))
                                        complete = true
                                    }
                                })
                            }
                            if (!complete) setModel(prev => prev.slice(0, currentPosition) + el.short_name + prev.slice(currentPosition))
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
