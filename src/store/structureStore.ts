import { IIndex, IStructure } from 'interface'
import { makeAutoObservable, runInAction } from 'mobx'
import getIndex from 'services/getIndex'

class StructureStore {
    structure: IStructure = {
        crop_id: -1,
        data: [],
        type: null,
    }
    index: IIndex = {
        data: [],
        group: [],
    }
    is_loaded = false

    constructor() {
        makeAutoObservable(this)
    }

    loadIndex = async () => {
        try {
            const res = await getIndex()
            runInAction(() => {
                this.index = res
                this.is_loaded = true
            })
        } catch (e) {
            return e
        }
    }
    setStructure = (data: IStructure) => {
        this.structure = data
    }
}
export default new StructureStore()
