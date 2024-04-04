import chartStore from './chartStore'
import editorStore from './editorStore'
import errorStore from './errorStore'
import favoriteStore from './favoriteStore'
import structureStore from './structureStore'
import userStore from './userStore'

class RootStore {
    editor = editorStore
    chart = chartStore
    struture = structureStore
    error = errorStore
    favorite = favoriteStore
    user = userStore
}
export default RootStore
