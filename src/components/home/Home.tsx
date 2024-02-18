import { EditProvider } from 'provider/EditProvider'
import Structure from './structure/Structure'
import Chart from './chart/Chart'
import Edit from './edit/Edit'
import Error from './error/Error'
import { FavoriteProvider } from 'provider/FavoriteProvider'
import Favorite from './favorite/Favorite'

const HomePage = () => {
    return (
        <>
            <Error />
            <Chart />
            <EditProvider>
                <FavoriteProvider>
                    <Structure />
                    <Edit />
                    <Favorite />
                </FavoriteProvider>
            </EditProvider>
        </>
    )
}
export default HomePage
