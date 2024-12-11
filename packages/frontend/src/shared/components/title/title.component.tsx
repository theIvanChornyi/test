import clsx from "clsx";
import { ReactNode, ElementType, ComponentPropsWithoutRef, } from "react"
import css from './title.style.module.css'


export interface TitleProps<Tag extends ElementType> {
  children: ReactNode;
  as?: Tag;
}

type TitleAdditionalProps<Tag extends ElementType> = Omit<
  ComponentPropsWithoutRef<Tag>,
  keyof TitleProps<Tag>
  >;

export default function Title<Tag extends ElementType = "h2">({
  children,
  className,
  as,
  ...props
}: TitleProps<Tag> & TitleAdditionalProps<Tag>) {
  const Component = as || "h2";
  return (
    <Component
    className={clsx(className,css.title)}
    {...props}
    >
      {children}
    </Component>
  );
}