import { IconCircleCheck } from '@tabler/icons-react'
import styles from './update-date.module.css'
import { useContext, useEffect, useState } from 'react'
import { IEditContext, EditContext } from 'provider/EditProvider'
import { updateDate } from 'services/indexData'
const UpdateDate = () => {
    const [update_date, setUpdateDate] = useState<Date | null>(null)
    const [update_date_string, setUpdateDateString] = useState<string>('')
    const { model_id } = useContext(EditContext) as IEditContext

    useEffect(() => {
        const F = async () => {
            const res = await updateDate()
            if (res.status !== 200) return
            const update_date_res = new Date(res.data.date)
            setUpdateDate(update_date_res)
        }
        F()
    }, [])

    useEffect(() => {
        if (!update_date) return
        const current_date = new Date()
        let delta = (current_date.getTime() - update_date.getTime()) / 1000 / 60
        if (delta < 60) setUpdateDateString(`${delta.toFixed(0)}мин`)
        else if (delta < 1440) setUpdateDateString(`${(delta / 60).toFixed(0)}ч`)
        else setUpdateDateString(`${(delta / 1440).toFixed(0)}дн`)
    }, [update_date, model_id])
    if (!update_date) return <></>
    return (
        <div className={styles.update_date} title="Обновление графиков">
            <IconCircleCheck color="#94D82D" />
            <p>{update_date_string} </p>
        </div>
    )
}

export default UpdateDate
