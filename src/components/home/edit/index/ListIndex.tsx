import { useContext, useEffect, useState } from 'react'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'

import styles from './list-index.module.css'
import { checkValid } from 'utils/writeCode'

type IList = number[]

const List = () => {
    const { index } = useContext(StructureContext) as IStructureContext

    const { group, inputRef, focus_index, setModel, setFocusIndex, model, setModelValid } = useContext(EditContext) as IEditContext
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
                            let update_model = ''
                            if (match !== null) {
                                match.forEach(word => {
                                    if (currentPosition >= model.indexOf(word) && currentPosition <= model.indexOf(word) + word.length) {
                                        update_model = model.replace(word, el.short_name)
                                        setModel(update_model)
                                        complete = true
                                    }
                                })
                            }

                            if (!complete) {
                                update_model = model.slice(0, currentPosition) + el.short_name + model.slice(currentPosition)
                                setModel(update_model)
                            }
                            const valid = checkValid(update_model, index)
                            setModelValid(valid.result)
                            setFocusIndex(id)

                            inputElement!.focus()
                            setTimeout(() => inputElement!.setSelectionRange(currentPosition, currentPosition), 10)
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
