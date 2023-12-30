import axios from 'services/axios'

export default async (): Promise<[any, any, any]> => {
    return new Promise(async (resolve, reject) => {
        const INDEX_DATA = await axios.get('/public/index_data.json')
        const ACTION_DATA = await axios.get('/public/action_data.json')
        const GROUP_DATA = await axios.get('/public/group_data.json')
        if (INDEX_DATA.status !== 200) {
            reject([])
        }
        resolve([INDEX_DATA.data, ACTION_DATA.data, GROUP_DATA.data])
    })
}
