import { IFavorite, IFavoriteItem } from 'interface'
import { createContext, useState, FC, ReactNode, useEffect, useContext } from 'react'
import { IErrorContext, ErrorContext } from 'provider/ErrorProvider'
import { getFavorite } from 'services/favorite'
import { UserContext, IUserContext } from 'provider/UserProvider'

type ICache = IFavoriteItem[]

export interface IFavoriteContext {
    opened: boolean
    favorite: IFavorite
    cache: ICache
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    setFavorite: React.Dispatch<React.SetStateAction<IFavorite>>
    setCache: React.Dispatch<React.SetStateAction<ICache>>
}

const FavoriteContext = createContext<IFavoriteContext | null>(null)
const FavoriteProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [opened, setOpened] = useState(false)
    const { user } = useContext(UserContext) as IUserContext
    const { setError } = useContext(ErrorContext) as IErrorContext
    const [favorite, setFavorite] = useState<IFavorite>(undefined)
    const [cache, setCache] = useState<ICache>([])
    useEffect(() => {
        const F = async () => {
            if (!user) return
            try {
                const res = await getFavorite()
                if (res.status == 200) {
                    setFavorite(res.data)
                }
            } catch (e: any) {
                setFavorite(null)
                setError(prev => [
                    ...prev,
                    {
                        content: (
                            <p>
                                {typeof e === 'string' ? (
                                    <>
                                        {e}
                                        <span
                                            className="error_link"
                                            onClick={() => {
                                                setFavorite(undefined)
                                                setError(prev => prev.filter((_, i) => i !== prev.length - 1))
                                                F()
                                            }}
                                        >
                                            Попробывать ещё раз
                                        </span>
                                    </>
                                ) : (
                                    'Не удалось загрузить "Избранное"'
                                )}
                            </p>
                        ),
                    },
                ])
            }
        }
        F()
    }, [user])

    return <FavoriteContext.Provider value={{ opened, setOpened, favorite, setFavorite, cache, setCache }}>{children}</FavoriteContext.Provider>
}

export { FavoriteProvider, FavoriteContext }
