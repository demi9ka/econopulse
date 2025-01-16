import styles from './generate-btn.module.css'
import { useContext, useEffect, useState } from 'react'
import { IUserContext, UserContext } from 'provider/UserProvider'
import { IStructureContext, StructureContext } from 'provider/StructureProvider'
import chart from 'services/chartData'
import { ErrorContext, IErrorContext } from 'provider/ErrorProvider'

import { IChartContext, ChartContext } from 'provider/ChartProvider'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@mantine/core'

const GenerateBtn = () => {
    const [disabled, setDisabled] = useState(false)
    const { setError } = useContext(ErrorContext) as IErrorContext
    const { user } = useContext(UserContext) as IUserContext
    const { structure, index } = useContext(StructureContext) as IStructureContext
    const { setChart } = useContext(ChartContext) as IChartContext
    const navigate = useNavigate()

    useEffect(() => {
        if (index) setDisabled(false)
        else setDisabled(true)
    }, [index])

    return (
        <button
            className={styles.btn}
            disabled={disabled}
            onClick={async () => {
                if (!user) return navigate('/register')
                if (structure.data.length) {
                    setDisabled(true)
                    setError([])
                    try {
                        const res = await chart(structure)
                        if (res.status == 200) setChart(res.data)
                    } catch (e: any) {
                        setError(prev => [...prev, { content: <p>{e}</p> }])
                    }
                    setDisabled(false)
                }
            }}
        >
            {disabled ? <Loader size={20} mr={10} color="#F8F9FA" /> : 'Генерация'}
        </button>
    )
}

export default GenerateBtn
