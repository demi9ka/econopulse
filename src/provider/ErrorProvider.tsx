import { IError } from 'interface'
import { createContext, useState, FC, ReactNode } from 'react'

export interface IErrorContext {
    error_data: IError[]
    setErrorData: React.Dispatch<React.SetStateAction<IError[]>>
}

const ErrorContext = createContext<IErrorContext | null>(null)
const ErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [error_data, setErrorData] = useState<IError[]>([])

    return <ErrorContext.Provider value={{ error_data, setErrorData }}>{children}</ErrorContext.Provider>
}

export { ErrorContext, ErrorProvider }
