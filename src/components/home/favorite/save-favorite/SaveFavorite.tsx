import { useState, useContext, useEffect } from 'react'
import styles from './save-favorite.module.css'
import { createFavorite } from 'services/favorite'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { FavoriteContext, IFavoriteContext } from 'provider/FavoriteProvider'
import { IUserContext, UserContext } from 'provider/UserProvider'
import { Loader } from '@mantine/core'

const SaveFavorite = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [req_proccess, setReqProccess] = useState(false)
    const { setFavorite, favorite } = useContext(FavoriteContext) as IFavoriteContext
    const { structure } = useContext(StructureContext) as IStructureContext
    const { user } = useContext(UserContext) as IUserContext

    const create = async (event?: React.FormEvent<HTMLFormElement>) => {
        event && event.preventDefault()
        setError('')
        if (!structure || !user || typeof favorite !== 'object' || !name) return
        try {
            setReqProccess(true)
            const res = await createFavorite(name, structure)
            if (res.status == 201) {
                setFavorite(prev => [...prev!, { ...res.data }])
                setName('')
            } else throw false
        } catch (e: any) {
            setError(typeof e === 'string' ? e : 'Неудалось сохранить')
        } finally {
            setReqProccess(false)
        }
    }
    useEffect(() => {
        if (!favorite) return
        const repeat_name = favorite.find(item => item.name === name.trim())
        if (repeat_name) setError('Название повторяется')
        else setError('')
    }, [name, favorite?.length])

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Сохранить конфигурацию. {error && <span className={styles.error}>{error}</span>}</p>
            <form onSubmit={create}>
                <input required className={styles.name_input} autoComplete="off" name="name" type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} autoFocus={true} />
                <button className={styles.submit_btn} disabled={name === '' || !structure || !user || favorite == null || !!favorite.find(item => item.name === name.trim()) || req_proccess} type="submit">
                    {req_proccess ? <Loader color="white" size={'xs'} /> : 'Сохранить'}
                </button>
            </form>
        </div>
    )
}
export default SaveFavorite
