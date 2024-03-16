import styles from './manual.module.css'

const Manual = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.nav_wrapper}>
                    <h3>Навигация</h3>
                    <nav>
                        <ul>
                            <li>
                                <a href="#basic">Основное</a>
                                <a href="#chart">График</a>
                                <a href="#link">Структура</a>
                                <a href="#link">Редактор</a>
                                <a href="#link">Избранное</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.manual_wrapper}>
                    <h1>Инструкция использования</h1>
                    <div className={styles.hint}>На этой странице вы сможете найти подробную документацию по использованию приложения. В будущем эта страница будет расширяться и обновляться.</div>
                    <div className={styles.block}>
                        <h2 id="basic" className={styles.name}>
                            Основное
                        </h2>
                        <p className={styles.block_text}>Сайт econopulse.ru предостовляет возможность генерации актуальных графиков Российского рынка. Для непосредственной генерации необходимо войти в учётную запись (Логин, пароль)</p>
                    </div>
                    <div className={styles.block}>
                        <h2 id="chart" className={styles.name}>
                            График
                        </h2>
                        <p className={styles.block_text}>
                            Для генерации графика используется бибилиотека{' '}
                            <a href="https://www.chartjs.org/" target="_blank">
                                chartjs
                            </a>
                            . При первой загрузке сайта на экране пользователя появиться график по умолчанию - IMOEX (Индекс МосБиржи). Вы можете включить или отключить отображения конкретной модели структуры с помощью легенды.
                            <img src="" alt="" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Manual
