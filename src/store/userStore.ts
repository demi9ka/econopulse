import { makeAutoObservable, runInAction } from 'mobx'
import { currentUser } from 'services/user'

class UserStore {
    name = ''
    is_loaded = false
    is_auth = false
    constructor() {
        makeAutoObservable(this)
    }
    getUser = async () => {
        try {
            const { name } = await currentUser()
            runInAction(() => {
                this.name = name
                this.is_loaded = true
                this.is_auth = true
            })
        } catch (e: any) {
            localStorage.removeItem('JWT')
            return e.response.message.data
        }
    }
    logout = () => {
        localStorage.removeItem('JWT')
        this.is_auth = false
    }
}

export default new UserStore()
