import { useState } from 'react'
import styles from './code-input.module.css'
import { checkValid } from 'utils/writeCode'
import { useStore } from 'provider/RootStoreProvider'

const CodeStructure = () => {
    const {
        editor: { input_ref, model, setModel, setModelValid, model_valid },
        struture: { index },
    } = useStore()
    const [valid_error, setValidError] = useState<string>('')

    const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidError('')
        setModelValid(true)
        const text_value = e.target.value
        const valid = checkValid(text_value, index)
        if (!valid.result) {
            setValidError(valid.error!)
            setModelValid(false)
        }

        setModel(text_value)
    }
    const deleteValue = () => {
        if (!input_ref.current) return
        const { selectionStart, selectionEnd } = input_ref.current

        if (selectionStart !== null && selectionStart === selectionEnd) {
            const cursorPosition = selectionStart
            let wordStartIndex = 0
            let wordEndIndex = model.length

            for (let i = cursorPosition - 1; i >= 0; i--) {
                if (' +-/*()'.includes(model.charAt(i))) {
                    wordStartIndex = i + 2
                    break
                }
            }

            for (let i = cursorPosition; i < model.length; i++) {
                if (' +-/*()'.includes(model.charAt(i))) {
                    wordEndIndex = i
                    break
                }
            }

            const newInputValue = model.slice(0, wordStartIndex) + model.slice(wordEndIndex)

            setModel(newInputValue)
            input_ref.current.focus()
            setTimeout(() => input_ref.current!.setSelectionRange(wordStartIndex, wordStartIndex), 10)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.code_wrapper} ${!model_valid && styles.error}`}>
                <span className={!model_valid ? styles.error : ''} title={valid_error}>
                    =
                </span>
                <input ref={input_ref} placeholder="GDP - (GDP * Keybid / 100)" onChange={e => setText(e)} onKeyDown={e => e.code == 'Backspace' && deleteValue()} value={model} className={styles.code} />
            </div>
        </div>
    )
}

export default CodeStructure
