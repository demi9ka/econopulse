import axios from './axios'
import { IStructure } from 'interface'

export const reqDeleteFavorite = async (id: number) => {
    return (
        await axios.delete('/api/delete_favorite', {
            data: { id },
        })
    ).data
}

export const createFavorite = async (name: string, data: IStructure) => {
    return (
        await axios.post('/api/create_favorite', {
            name,
            data,
        })
    ).data
}

export const getFavorite = async () => (await axios.get('/api/get_favorite')).data
