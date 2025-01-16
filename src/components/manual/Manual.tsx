import styles from './manual.module.css'

const Manual = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.block}>
                    <h2 id="basic" className={styles.block_name}>
                        Основное
                    </h2>
                    <p className={styles.block_text}>
                        Проанализировать ситуацию на макроэкономическом уровне может быть сложной задачей. Однако, благодаря нашему сайту, эта задача становится более простой и интересной. Этот уникальный ресурс предоставляет удобный инструмент для
                        генерации актуальных графиков, построенных на данных макроэкономической статистики. Все пользователи теперь могут легко визуализировать и анализировать ключевые экономические показатели, такие как инфляция, ВВП, валюта, сырьё
                        и многие другие. С помощью наглядных графиков, мы предоставляем уникальную возможность получить ценную информацию об экономической ситуации страны. Что делает сайт econopulse особенным и полезным? Прежде всего, это интуитивно
                        понятный интерфейс, который позволяет быстро выбирать нужные показатели и строить графики.
                    </p>
                    <p className={styles.block_text}>
                        Без необходимости знать особенности статистических баз данных, вы можете легко создавать графики, которые позволяют лучше понять текущую экономическую ситуацию и предсказать ее развитие. Кроме того, на сайте постоянно
                        обновляются данные, чтобы предоставить вам актуальную информацию. Это значит, что вы всегда будете иметь доступ к последним статистическим данным и сможете следить за изменениями в экономике. Такая актуальность позволяет
                        пользователям принимать более обоснованные решения в различных сферах - от инвестиций до бизнес-анализа. Как видно – это не просто сайт, на котором можно создавать графики. Это удобный, всесторонний и актуальный ресурс,
                        позволяющий улучшить вашу экономическую грамотность и принимать обоснованные решения. Если вы интересуетесь макроэкономикой и хотите легко получать информацию и анализировать ее с помощью графиков, econopulse – это то, что вам
                        нужно.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Manual
