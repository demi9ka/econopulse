import { createContext, useState, FC, ReactNode, useEffect } from 'react'
import { IUser } from 'interface'
import { getUser } from 'services/user'

export interface IUserContext {
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

const UserContext = createContext<IUserContext | null>(null)
const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser>(undefined)
    useEffect(() => {
        const F = async () => {
            try {
                const res = await getUser()
                if (res.status == 200) setUser(res.data)
            } catch {
                localStorage.removeItem('JWT')
                setUser(null)
            }
        }
        F()
    }, [])

    return <UserContext.Provider value={{ setUser, user }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
