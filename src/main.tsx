import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App.tsx'
import '@mantine/core/styles.css'
import './style.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from 'provider/AppProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider defaultColorScheme="dark">
                <AppProvider>
                    <App />
                </AppProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
)
