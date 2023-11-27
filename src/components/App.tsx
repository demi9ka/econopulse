import styles from './app.module.css'
import Calculator from './calculator/Calculator'
import Chart from './chart/Chart'
import EditMenu from './edit-menu/EditMenu'
import Header from './header/Header'
import { EditMenuProvider } from 'provider/EditMenuProvider'
import { CalculationContext, ICalculationContext } from 'provider/CalculationProvider'
import { useContext } from 'react'
import LoadScreen from './load-screen/LoadScreen'

const App = () => {
    const { INDEX_DATA } = useContext(CalculationContext) as ICalculationContext

    return (
        <div className={styles.container}>
            <Header />
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
        </div>
    )
}
export default App
