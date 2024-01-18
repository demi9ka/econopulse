import { EditMenuProvider } from 'provider/EditMenuProvider'
import Calculator from './calculator/Calculator'
import Chart from './chart/Chart'
import EditMenu from './edit-menu/EditMenu'
import AppError from './app-error/AppError'

const HomePage = () => {
    return (
        <>
            <AppError />
            <Chart />
            <EditMenuProvider>
                <Calculator />
                <EditMenu />
            </EditMenuProvider>
        </>
    )
}
export default HomePage
