import axios from './axios'
import { IIndex } from 'interface'

export const getIndex = async () => {
    return (await axios.get<IIndex>('/api/index_data')).data
}

export default getIndex
