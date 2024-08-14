import clsx from 'clsx'
import { CardProps } from './Card.types'
import { ComponentProps, PropsWithChildren } from 'react'

function Card_({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col rounded-xl w-96 bg-white shadow-xl border border-gray-50',
        className,
      )}
    >
      {children}
    </div>
  )
}

function Title({ children, className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1 {...props} className={clsx('text-2xl font-bold', className)}>
      {children}
    </h1>
  )
}

function Header({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={clsx('px-8 py-4 border-b', className)}>
      {children}
    </div>
  )
}

function Content({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={clsx('px-8 py-4', className)}>
      {children}
    </div>
  )
}

export const Card = Object.assign(Card_, {
  Title,
  Header,
  Content,
})
