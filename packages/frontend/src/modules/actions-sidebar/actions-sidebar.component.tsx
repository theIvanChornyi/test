import { FC } from "react"
import clsx from "clsx"
import css from './actions-sidebar.style.module.css'
import Sidebar from "../sidebar/sidebar.component"
import Widget from "../widget/widget.component"
import QuickForm from "../quick-form/quick-form.component"


interface IProps {
  style?:string
}


const ActionsSidebar: FC<IProps> = ({style}) => {
  return <Sidebar style={clsx(style, css.sidebar)}>
    <QuickForm/>
    <Widget/>
  </Sidebar>
 }

export default ActionsSidebar