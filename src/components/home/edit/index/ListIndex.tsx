import { useEffect, useState } from 'react'
import styles from './list-index.module.css'
import { checkValid } from 'utils/writeCode'
import { useStore } from 'provider/RootStoreProvider'
import { observer } from 'mobx-react-lite'

type IList = number[]

const List = () => {
    const {
        editor: { group, input_ref, focus_index, setModel, setFocusIndex, model, setModelValid },
        struture: { index },
    } = useStore()

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
                            const inputElement = input_ref.current
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
export default observer(List)
