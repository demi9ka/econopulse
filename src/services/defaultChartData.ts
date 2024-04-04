import { IChart } from 'interface'
import axios from './axios'

export default async () => {
    return (await axios.get<IChart>('/api/default_chart_data')).data
}
