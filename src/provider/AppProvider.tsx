import { ErrorProvider } from 'provider/ErrorProvider'
import { StructureProvider } from 'provider/StructureProvider'
import { ChartProvider } from 'provider/ChartProvider'
import { UserProvider } from 'provider/UserProvider'
import { FC, ReactNode } from 'react'

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ErrorProvider>
            <UserProvider>
                <StructureProvider>
                    <ChartProvider>{children}</ChartProvider>
                </StructureProvider>
            </UserProvider>
        </ErrorProvider>
    )
}

export default AppProvider
