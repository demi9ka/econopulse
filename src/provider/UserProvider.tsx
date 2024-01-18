import { createContext, useState, FC, ReactNode, useEffect } from 'react'
import { IUserData } from 'interface'
import { getUser } from 'services/user'

export interface IUserDataContext {
    user_data: IUserData
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>
}

const UserDataContext = createContext<IUserDataContext | null>(null)
const UserDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user_data, setUserData] = useState<IUserData>(undefined)
    useEffect(() => {
        const F = async () => {
            try {
                const res = await getUser()
                if (res.status == 200) setUserData(res.data)
            } catch {
                localStorage.removeItem('JWT')
                setUserData(null)
            }
        }
        F()
    }, [])

    return <UserDataContext.Provider value={{ setUserData, user_data }}>{children}</UserDataContext.Provider>
}

export { UserDataContext, UserDataProvider }
