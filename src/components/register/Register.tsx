import { useState, useContext } from 'react'
import styles from '../login/form.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { postRegister } from 'services/user'
import { Loader } from '@mantine/core'
import { IUserData } from 'interface'
import { IUserDataContext, UserDataContext } from 'provider/UserProvider'

const Register = () => {
    const { setUserData } = useContext(UserDataContext) as IUserDataContext
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [p_type, setPType] = useState(false)
    const [wait_res, setWaitRes] = useState(false)
    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        const form_data = new FormData(event.currentTarget)
        const form_value = Object.fromEntries(form_data.entries()) as Record<string, any>
        const { password, name } = form_value
        if (password.length < 4) {
            setError('Пароль не меньше 4 символов')
            return
        }
        if (name.length < 3) {
            setError('Имя не меньше 3 символов')
            return
        }
        if (form_value.password !== form_value.repeat_password) {
            setError('Пароли не совпадают')
            return
        }
        try {
            setWaitRes(true)
            setError('')
            const res = await postRegister(form_value)
            localStorage.setItem('JWT', res.data.jwt)
            delete res.data.jwt
            if (res.status == 201) setUserData(res.data as IUserData)
            setWaitRes(false)
            return navigate('/')
        } catch (e: any) {
            setWaitRes(false)
            setError(typeof e === 'string' ? e : 'Сервис не доступен')
        }
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={register}>
                <div>
                    <h2 className={styles.title}>Регистрация</h2>

                    <input autoComplete="off" required className={styles.form_input} type="text" placeholder="Имя пользователя" name="name" />
                    <label htmlFor="login_password_input" className={styles.pass_input_wrapper}>
                        <input autoComplete="off" minLength={4} id="login_password_input" required className={`${styles.form_input} ${styles.pass_input}`} type={p_type ? 'text' : 'password'} placeholder="Пароль" name="password" />
                        <div className={styles.view_password} onClick={() => setPType(!p_type)}>
                            {p_type ? <IconEye width={22} /> : <IconEyeOff width={22} />}
                        </div>
                    </label>
                    <input autoComplete="off" required className={styles.form_input} type={p_type ? 'text' : 'password'} placeholder="Повтор пароля" name="repeat_password" />
                </div>
                <div>
                    {error.length != 0 && <div className={styles.error_wrapper}>{error}</div>}
                    <button disabled={wait_res} type="submit" className={styles.submit_button}>
                        {wait_res ? <Loader color="white" size={'xs'} /> : 'Регистрация'}
                    </button>
                    <p className={styles.alternative}>
                        Есть аккаунт? <Link to={'/login'}>Вход</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Register
