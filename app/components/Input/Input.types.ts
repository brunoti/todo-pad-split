import { ComponentProps } from 'react'
import { Simplify } from 'type-fest'

export type InputProps = Simplify<
  Omit<ComponentProps<'input'>, 'type'> & {
    error?: string
    label?: string
  }
>
