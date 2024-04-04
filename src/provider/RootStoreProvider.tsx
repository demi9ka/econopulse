import { createContext, useContext } from 'react'
import RootStore from 'store/rootStore'

export const RootStoreContext = createContext<RootStore | null>(null)

export const useStore = () => {
    const context = useContext(RootStoreContext)
    if (context === null) {
        throw new Error('store error')
    }

    return context
}
