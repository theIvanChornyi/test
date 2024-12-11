import WidgetButton from './components/widget-button.component'
import { widgetConfig } from './widget.config'
import css from './widget.style.module.css'

const Widget = () => {
  const widgetsItems = widgetConfig.map(({ ico, name,href }) => {
    return <li key={name}>
      <WidgetButton href={href} text={name} ico={ico} />
    </li>})

  return  <section className={css.wrapper}>
    <ul className={css.list}>
      {widgetsItems}
      </ul>
    </section>
}

export default Widget