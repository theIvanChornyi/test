import clsx from "clsx"
import { FC, ReactNode } from "react"
import css from './sidebar.style.module.css'

interface IProps {
  children?: ReactNode
  style?:string
}


const Sidebar: FC<IProps> = ({children,style}) => {
  return <aside className={clsx(style, css.sidebar)}>
    {children}
  </aside>
 }

export default Sidebar