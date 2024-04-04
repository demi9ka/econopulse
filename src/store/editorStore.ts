import { makeAutoObservable } from 'mobx'
import { useRef } from 'react'

class EditorStore {
    input_ref: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    focus_index = -1 //id индекса под курсором
    group = -1
    model = '' //копия модели
    model_id = -1 //id модели в structure,
    model_valid = true //валидна ли модель

    constructor() {
        makeAutoObservable(this)
    }

    setFocusIndex = (id: number) => (this.focus_index = id)
    setGroup = (id: number) => (this.group = id)
    setModel = (model: string) => (this.model = model)
    setModelId = (id: number) => {
        if (id < 0) return
    }
    setModelValid = (value: boolean) => (this.model_valid = value)
}
export default new EditorStore()
