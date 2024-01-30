import { useState, useContext, useEffect } from 'react'
import styles from './save-favorite.module.css'
import { createFavorite } from 'services/favorite'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { FavoriteMenuContext, IFavoriteMenuContext } from 'provider/FavoriteProvider'
import { IUserDataContext, UserDataContext } from 'provider/UserProvider'
import { IconDeviceFloppy } from '@tabler/icons-react'

const SaveFavorite = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')

    const { setFavoriteData, favorite_data } = useContext(FavoriteMenuContext) as IFavoriteMenuContext
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const { user_data } = useContext(UserDataContext) as IUserDataContext
    useEffect(() => {
        if (typeof favorite_data !== 'object') return
    }, [favorite_data])
    const create = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        if (!calculation_data || !user_data || typeof favorite_data !== 'object' || !name) return
        try {
            const res = await createFavorite(name, calculation_data)
            if (res.status == 201) {
                res.data.data = JSON.parse(res.data.data)
                setFavoriteData(prev => [...prev!, { ...res.data, create_date: new Date(res.data.create_date) }])
                setName('')
            } else throw false
        } catch (e: any) {
            setError(typeof e === 'string' ? e : 'Неудалось сохранить')
        }
    }
    useEffect(() => {
        if (!favorite_data) return
        const repeat_name = favorite_data.find(item => item.name === name.trim())
        if (repeat_name) setError('Название повторяется')
        else setError('')
    }, [name, favorite_data?.length])

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Сохранить конфигурацию. {error && <span className={styles.error}>{error}</span>}</p>
            <form onSubmit={create}>
                <input required className={styles.name_input} autoComplete="off" name="name" type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} autoFocus={true} />
                <button className={styles.submit_btn} disabled={name === '' || !calculation_data || !user_data || favorite_data == null || !!favorite_data.find(item => item.name === name.trim())} type="submit">
                    <IconDeviceFloppy />
                </button>
            </form>
        </div>
    )
}
export default SaveFavorite
