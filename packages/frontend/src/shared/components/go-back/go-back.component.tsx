import Link from "next/link"
import { FC } from "react"
import { FRONT_ROUTES } from "../../routes"
import clsx from "clsx"

interface IProps{
  text?: string
  path?: keyof typeof FRONT_ROUTES
  styles?:string
}

const GoBack: FC<IProps> = ({ path = "HOME", text='Home',styles}) => {
  return  <Link className={clsx(styles)} href={FRONT_ROUTES[path]}>{text}</Link>
}

export default GoBack