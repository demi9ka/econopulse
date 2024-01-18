import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'components/App.tsx'
import { CalculationProvider } from 'provider/CalculationProvider.tsx'
// import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import './style.css'
import { MantineProvider } from '@mantine/core'
import { ChartDataProvider } from 'provider/ChartDataProvider'
import { BrowserRouter } from 'react-router-dom'
import { UserDataProvider } from 'provider/UserProvider'
import { ErrorProvider } from 'provider/ErrorProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider defaultColorScheme="dark">
                <ErrorProvider>
                    <UserDataProvider>
                        <CalculationProvider>
                            <ChartDataProvider>
                                <App />
                            </ChartDataProvider>
                        </CalculationProvider>
                    </UserDataProvider>
                </ErrorProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
)
