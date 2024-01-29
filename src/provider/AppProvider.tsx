import { ErrorProvider } from 'provider/ErrorProvider'
import { CalculationProvider } from 'provider/CalculationProvider'
import { ChartDataProvider } from 'provider/ChartDataProvider'
import { UserDataProvider } from 'provider/UserProvider'
import { FC, ReactNode } from 'react'

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ErrorProvider>
            <UserDataProvider>
                <CalculationProvider>
                    <ChartDataProvider>{children}</ChartDataProvider>
                </CalculationProvider>
            </UserDataProvider>
        </ErrorProvider>
    )
}

export default AppProvider
