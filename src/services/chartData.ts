import axios from './axios'
import { IStructure } from 'interface'

export default async (structure: IStructure) => {
    return (await axios.post('/api/chart_data', structure)).data
}
