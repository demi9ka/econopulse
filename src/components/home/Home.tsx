import { EditMenuProvider } from 'provider/EditMenuProvider'
import Calculator from './calculator/Calculator'
import Chart from './chart/Chart'
import EditMenu from './edit-menu/EditMenu'
import AppError from './app-error/AppError'
import { FavoriteMenuProvider } from 'provider/FavoriteProvider'
import FavoriteMenu from './favorite-menu/FavoriteMenu'

const HomePage = () => {
    return (
        <>
            <AppError />
            <Chart />
            <EditMenuProvider>
                <FavoriteMenuProvider>
                    <Calculator />
                    <EditMenu />
                    <FavoriteMenu />
                </FavoriteMenuProvider>
            </EditMenuProvider>
        </>
    )
}
export default HomePage
