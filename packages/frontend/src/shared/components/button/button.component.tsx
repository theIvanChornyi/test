import { ButtonHTMLAttributes, FC } from "react"
import clsx from "clsx"
import css from './button.style.module.css'
import { ButtonVariant } from "../../types/button.variant.type"


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string
  text?: string
  variant?:ButtonVariant
}


const Button: FC<IProps> = (
  { styles,
    text,
    type = 'button',
    variant = ButtonVariant.primary,
    ...other }
) => {
  return <button type={type} className={clsx(
    {
      styles,
      [css.button]: true,
      [css.buttonLight] : variant === ButtonVariant.light
    }
  )} {...other}>
    {text}
  </button>
 }

export default Button