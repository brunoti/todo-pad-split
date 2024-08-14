import { ComponentProps, PropsWithChildren } from 'react'
import { Simplify } from 'type-fest'

export type CardProps = Simplify<PropsWithChildren<ComponentProps<'div'>>>
