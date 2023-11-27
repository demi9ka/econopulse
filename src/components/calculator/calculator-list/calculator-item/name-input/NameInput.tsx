// import { FC, useContext, useEffect, useState } from 'react'
// import {
//     CalculationContext,
//     ICalculationContext,
// } from '../../../../../provider/CalculationProvider'
// import styles from './name-input.module.css'

// const NameInput: FC<{ id: number }> = ({ id }) => {
//     const { calculation_data, setCalculationData } = useContext(
//         CalculationContext
//     ) as ICalculationContext

//     const [chart_name, setChartName] = useState(calculation_data[id].name)

//     useEffect(() => {
//         calculation_data[id].name = chart_name
//         setCalculationData([...calculation_data])
//     }, [chart_name])

//     const [name_focus, setNameFocus] = useState(false)

//     return (
//         <label
//             htmlFor={`user_input${id}`}
//             className={`${styles.name_wrapper} ${
//                 name_focus && styles.name_wrapper__focus
//             }`}
//         >
//             <p className={styles.hint}>имя:</p>
//             <input
//                 onFocus={() => setNameFocus(true)}
//                 onBlur={() => setNameFocus(false)}
//                 type="text"
//                 id={`user_input${id}`}
//                 value={chart_name}
//                 onChange={e => setChartName(e.target.value)}
//                 className={styles.name}
//             />
//         </label>
//     )
// }
// export default NameInput
