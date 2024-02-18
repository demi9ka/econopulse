import { useContext } from 'react'
import styles from './code-input.module.css'

// import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { EditContext, IEditContext } from 'provider/EditProvider'

const CodeStructure = () => {
    const { inputRef, model, setModel } = useContext(EditContext) as IEditContext
    // const { index } = useContext(StructureContext) as IStructureContext
    const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text_value = e.target.value
        setModel(text_value)
        // let value = text_value.toLocaleLowerCase()
        // for (const el of index!.data) {
        //     valkue = calc_value.replace(new RegExp(`(${el.short_name.toLowerCase()})`, 'g'), `{${el.id}}`)
        // }
        // const inputElement = inputRef.current
        // if (!inputElement) return

        // const currentPosition = inputElement!.selectionStart
    }

    return (
        <div className={styles.wrapper}>
            {/* <div className={styles.code_wrapper}>
                <span>=</span> <div ref={inputRef} contentEditable className={styles.code} dangerouslySetInnerHTML={{ __html: text }}></div>
            </div> */}
            <div className={styles.code_wrapper}>
                <span>=</span> <input ref={inputRef} onChange={e => setText(e)} value={model} className={styles.code} />
            </div>
        </div>
    )
}

export default CodeStructure
