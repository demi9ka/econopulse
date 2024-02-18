import styles from './load-favorite.module.css'
import { useContext, useState } from 'react'
import { Loader } from '@mantine/core'
import { FavoriteContext, IFavoriteContext } from 'provider/FavoriteProvider'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'
import { createFavorite, deleteFavorite } from 'services/favorite'
import { IconArrowsExchange, IconHexagonLetterR, IconX } from '@tabler/icons-react'
import randomColor from 'utils/randomColor'
import { cloneDeep } from 'lodash'

const LoadFavorite = () => {
    const { favorite, setFavorite, setOpened, cache, setCache } = useContext(FavoriteContext) as IFavoriteContext
    const { setStructure } = useContext(StructureContext) as IStructureContext
    const [error, setError] = useState('')
    const [active_item_id, setActiveItemId] = useState(-1)
    const [action_state, setActionState] = useState<number[]>([])
    const setFavoriteLocal = () => {
        if (active_item_id < 0) return
        const active_item: any = favorite!.find(item => item.id == active_item_id)!.data
        active_item.data = active_item.data.map((item: any) => {
            return {
                ...item,
                color: randomColor(),
                name: '',
            }
        })
        active_item.data[0].color = '#E9ECEF'
        setStructure(cloneDeep({ ...active_item }))
        setOpened(false)
    }
    const deleteItem = async (id: number) => {
        try {
            setActionState(prev => [...prev, id])
            const res = await deleteFavorite(id)
            if (res.status == 200) {
                setCache(prev => [...prev, favorite!.filter(item => item.id == res.data.id)[0]])
                setFavorite(prev => prev!.filter(item => item.id !== res.data.id))
                setActiveItemId(-1)
            }
        } catch (e: any) {
            setError(typeof e === 'string' ? e : 'Неудалось удалить')
        } finally {
            setActionState(prev => prev.filter(el => el !== id))
        }
    }
    const recoveryItem = async (id: number) => {
        const data = cache.filter(item => item.id === id)[0]
        if (!data) {
            setError('Не удалось восстановить')
            return
        }
        const name = data.name
        if (!data.data || !name) return
        try {
            setActionState(prev => [...prev, id])
            const res = await createFavorite(name, data.data as any)
            if (res.status == 201) {
                setFavorite(prev => [...prev!, { ...res.data }])
                setCache(prev => prev.filter(el => el.id !== id))
            } else throw false
        } catch (e: any) {
            setError(typeof e === 'string' ? e : 'Неудалось восстановить')
        } finally {
            setActionState(prev => prev.filter(el => el !== id))
        }
    }
    let favorite_content

    if (typeof favorite === 'undefined')
        favorite_content = (
            <p className={styles.msg}>
                <Loader />
            </p>
        )
    else if (typeof favorite === null) favorite_content = <p className={styles.msg}>Ошибка загрузки</p>
    else if (favorite?.length == 0) favorite_content = <p className={styles.msg}>Нету сохранённых конфигураций</p>
    else if (favorite)
        favorite_content = favorite!.map(item => (
            <div
                key={item.id}
                className={`${styles.item} ${item.id === active_item_id && styles.active}`}
                onClick={() => {
                    setActiveItemId(item.id)
                }}
            >
                <div className={styles.name_wrapper}>
                    <p className={styles.name}>{item.name}</p>
                    {item.data.type == 'roc' && <IconHexagonLetterR width={18} color="#7950F2" />}
                    {item.data.type == 'overlay' && <IconArrowsExchange width={18} color="#FAB005" />}
                </div>
                {action_state.includes(item.id) ? (
                    <Loader size={'xs'} />
                ) : (
                    <div className={styles.delete} onClick={() => deleteItem(item.id)}>
                        <IconX color="#FA5252" width={17} height={17} />
                    </div>
                )}
            </div>
        ))

    return (
        <div className={styles.wrapper}>
            <div className={styles.content_wrapper}>
                <h2 className={styles.title}>
                    Сохранённые <span className={styles.count}>{typeof favorite === 'object' && favorite?.length}</span>
                    <span className={styles.error}>{!!error && error}</span>
                </h2>
                <div className={styles.favorite_wrapper}>{favorite_content}</div>
                {cache.length > 0 && (
                    <>
                        <h2 className={styles.title}>
                            Корзина{' '}
                            <span onClick={() => setCache([])} className={styles.clear_cache}>
                                Очистить
                            </span>
                        </h2>
                        <div className={styles.favorite_wrapper}>
                            {cache!.map(item => (
                                <div key={item.id} className={styles.item} style={{ opacity: 0.8 }}>
                                    <div className={styles.name_wrapper}>
                                        <p className={styles.name}>{item.name}</p>
                                        {item.data.type == 'roc' && <IconHexagonLetterR width={18} color="#7950F2" />}
                                        {item.data.type == 'overlay' && <IconArrowsExchange width={18} color="#FAB005" />}
                                    </div>
                                    {action_state.includes(item.id) ? (
                                        <Loader size={'xs'} />
                                    ) : (
                                        <p className={styles.recovery} onClick={() => recoveryItem(item.id)}>
                                            Восстановить
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <button disabled={active_item_id === -1} className={styles.confirm_btn} onClick={setFavoriteLocal}>
                Загрузить
            </button>
        </div>
    )
}
export default LoadFavorite
