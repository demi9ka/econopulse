import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App.tsx'
import '@mantine/core/styles.css'
import './style.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { RootStoreContext } from 'provider/RootStoreProvider'
import RootStore from 'store/rootStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider defaultColorScheme="dark">
                <RootStoreContext.Provider value={new RootStore()}>
                    <App />
                </RootStoreContext.Provider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
)
