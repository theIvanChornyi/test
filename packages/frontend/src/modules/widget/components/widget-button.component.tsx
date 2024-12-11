import { FC } from "react"
import Image from "next/image";

import css from '../widget.style.module.css'
import Link from "next/link";
import { FRONT_ROUTES } from "../../../shared/routes";

interface IProps {
  text: string,
  ico: string,
  href: keyof typeof FRONT_ROUTES
  action?: () => void 
}

const WidgetButton: FC<IProps> = ({ text, ico ,href}) => {
  
  return <Link href={FRONT_ROUTES[href]} className={css.widgetButton} type="button">
    <div className={css.buttonIco}><Image src={ico} width={18} height={18} alt="ico" /></div>
    <p>{text }</p>

  </Link>
}

export default WidgetButton