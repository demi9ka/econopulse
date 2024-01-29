import { IFavoriteData, IFavoriteItem } from 'interface'
import { createContext, useState, FC, ReactNode, useEffect, useContext } from 'react'
import { IErrorContext, ErrorContext } from 'provider/ErrorProvider'
import { getFavorite } from 'services/favorite'
import { UserDataContext, IUserDataContext } from 'provider/UserProvider'

export interface IFavoriteMenuContext {
    view_modal: boolean
    favorite_data: IFavoriteData
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>
    setFavoriteData: React.Dispatch<React.SetStateAction<IFavoriteData>>
}

const FavoriteMenuContext = createContext<IFavoriteMenuContext | null>(null)
const FavoriteMenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [view_modal, setViewModal] = useState(false)
    const { user_data } = useContext(UserDataContext) as IUserDataContext

    const { setErrorData } = useContext(ErrorContext) as IErrorContext
    const [favorite_data, setFavoriteData] = useState<IFavoriteData>(undefined)
    useEffect(() => {
        const F = async () => {
            if (!user_data) return
            try {
                const res = await getFavorite()
                if (res.status == 200) {
                    setFavoriteData(
                        res.data.map((item: IFavoriteItem) => {
                            item.data.data = item.data.data.map(elem => {
                                elem.data[elem.data.length - 1].action_id = undefined
                                return elem
                            })

                            return { ...item, create_date: new Date(item.create_date) }
                        })
                    )
                }
            } catch (e: any) {
                setFavoriteData(null)
                setErrorData(prev => [
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
                                                setFavoriteData(undefined)
                                                setErrorData(prev => prev.filter((_, i) => i !== prev.length - 1))
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
    }, [user_data])

    return <FavoriteMenuContext.Provider value={{ view_modal, setViewModal, favorite_data, setFavoriteData }}>{children}</FavoriteMenuContext.Provider>
}

export { FavoriteMenuProvider, FavoriteMenuContext }
