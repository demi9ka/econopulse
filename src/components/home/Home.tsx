import { EditMenuProvider } from 'provider/EditMenuProvider'
import LoadScreen from './load-screen/LoadScreen'
import Calculator from './calculator/Calculator'
import Chart from './chart/Chart'
import EditMenu from './edit-menu/EditMenu'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { useContext } from 'react'

const HomePage = () => {
    const { INDEX_DATA } = useContext(CalculationContext) as ICalculationContext
    return (
        <>
            {INDEX_DATA.length ? (
                <>
                    <Chart />
                    <EditMenuProvider>
                        <Calculator />
                        <EditMenu />
                    </EditMenuProvider>
                </>
            ) : (
                <LoadScreen />
            )}
        </>
    )
}
export default HomePage
