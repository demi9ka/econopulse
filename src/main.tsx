import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App.tsx'
import './style.css'
import { CalculationProvider } from 'provider/CalculationProvider.tsx'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { ChartDataProvider } from 'provider/ChartDataProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider defaultColorScheme="dark">
                <CalculationProvider>
                    <ChartDataProvider>
                        <App />
                    </ChartDataProvider>
                </CalculationProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
)
