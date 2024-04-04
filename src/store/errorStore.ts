import { makeAutoObservable } from 'mobx'

class ErrorStore {
    error: string[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addError = (error: string) => {
        this.error.push(error)
    }
    deleteError = (id: number) => {
        this.error = this.error.filter((_, er_id) => er_id !== id)
    }
}
export default new ErrorStore()
