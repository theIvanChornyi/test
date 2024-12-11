import { FC } from "react"
import clsx from 'clsx'
import Link from "next/link";

import Sidebar from "../sidebar/sidebar.component"
import css from "./nav-sidebar.style.module.css";
import Title from "../../shared/components/title/title.component";
import { FRONT_ROUTES } from "../../shared/routes";


interface IProps {
  style?:string
}


const NavSidebar: FC<IProps> = ({ style }) => {
  return <Sidebar style={clsx(css.wrapper,style)}>
    <nav>
    <Title as="h1" className={css.title}>Amazing bank</Title>
    <ul className={css.linkList}>
      <li><Link className={css.navLink} href={FRONT_ROUTES.HOME}>Home</Link></li>
      <li><Link className={css.navLink} href="/">Analytics</Link></li>
      <li><Link className={css.navLink} href="/">Wallets</Link></li>
      <li><Link className={css.navLink} href="/">Invoices</Link></li>
      <li><Link className={css.navLink} href="/">Account</Link></li>
      <li><Link className={css.navLink} href="/">Settings</Link></li>
    </ul>
    </nav>
  </Sidebar>
 }

export default NavSidebar