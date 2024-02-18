import { FC, useContext, useEffect, useState } from 'react'
import styles from './color.module.css'
import { StructureContext, IStructureContext } from 'provider/StructureProvider'

let color_count = 0
const ColorInput: FC<{ id: number }> = ({ id }) => {
    const { structure, setStructure } = useContext(StructureContext) as IStructureContext
    const [chart_color, setChartColor] = useState(structure.data[id].color)
    useEffect(() => {
        color_count += 1
        const copy_count = color_count
        setTimeout(() => {
            if (copy_count === color_count) {
                color_count = 0
                structure.data[id].color = chart_color
                setStructure(structure)
            }
        }, 500)
    }, [chart_color])
    useEffect(() => {
        setChartColor(structure.data[id].color)
    }, [structure])
    return <input className={styles.color_input} type="color" value={chart_color} title="Цвет графа" onChange={e => setChartColor(e.target.value)} />
}

export default ColorInput
