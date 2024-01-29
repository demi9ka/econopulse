import { useState, useContext, useEffect } from 'react'
import styles from './save-favorite.module.css'
import { createFavorite } from 'services/favorite'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { FavoriteMenuContext, IFavoriteMenuContext } from 'provider/FavoriteProvider'
import { IUserDataContext, UserDataContext } from 'provider/UserProvider'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { isEqual } from 'lodash'

const SaveFavorite = () => {
    const [error, setError] = useState('')
    const [view_save, setViewSave] = useState(true)
    const [name, setName] = useState('')

    const { setFavoriteData, favorite_data } = useContext(FavoriteMenuContext) as IFavoriteMenuContext
    const { calculation_data } = useContext(CalculationContext) as ICalculationContext
    const { user_data } = useContext(UserDataContext) as IUserDataContext
    useEffect(() => {
        if (typeof favorite_data !== 'object') return
        const _calculation_data = {
            crop_id: calculation_data.crop_id,
            type: calculation_data.type,
            data: calculation_data.data.map(({ data, reverse }) => {
                return { data, reverse }
            }),
        }

        const repeat_item = favorite_data!.find(item => isEqual(item.data, _calculation_data))
        if (repeat_item) setViewSave(false)
    }, [calculation_data, favorite_data])
    const create = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        if (!calculation_data || !user_data || typeof favorite_data !== 'object' || !name) return
        try {
            const res = await createFavorite(name, calculation_data)
            if (res.status == 201) {
                res.data.data = JSON.parse(res.data.data)
                setFavoriteData(prev => [{ ...res.data, create_date: new Date(res.data.create_date) }, ...prev!])
                setViewSave(false)
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
        <div className={`${styles.wrapper} ${!view_save && styles.already}`}>
            {view_save ? (
                <>
                    <p className={styles.title}>Сохранить конфигурацию. {error && <span className={styles.error}>{error}</span>}</p>
                    <form onSubmit={create}>
                        <input required className={styles.name_input} autoComplete="off" name="name" type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} autoFocus={true} />
                        <button className={styles.submit_btn} disabled={name === '' || !calculation_data || !user_data || favorite_data == null || !!favorite_data.find(item => item.name === name.trim())} type="submit">
                            <IconDeviceFloppy />
                        </button>
                    </form>
                </>
            ) : (
                <>
                    Текущая конфигурация уже существует.{' '}
                    <span className={styles.create_confirm} onClick={() => setViewSave(true)}>
                        Всё равно сохранить
                    </span>
                </>
            )}
        </div>
    )
}
export default SaveFavorite
