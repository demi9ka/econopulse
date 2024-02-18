import { IError } from 'interface'
import { createContext, useState, FC, ReactNode } from 'react'

export interface IErrorContext {
    error_data: IError[]
    setError: React.Dispatch<React.SetStateAction<IError[]>>
}

const ErrorContext = createContext<IErrorContext | null>(null)
const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [error_data, setError] = useState<IError[]>([])

    return <ErrorContext.Provider value={{ error_data, setError }}>{children}</ErrorContext.Provider>
}

export { ErrorContext, ErrorProvider }
