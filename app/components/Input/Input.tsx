import clsx from 'clsx'
import { InputProps } from './Input.types'

export function Input({ name, label, error, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-500">
          {label}
        </label>
      )}

      <input
        {...props}
        name={name}
        id={name}
        type="text"
        className={clsx(
          'block mt-2 w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700  focus:outline-none focus:ring focus:ring-opacity-40',
          !error && 'border-gray-200 focus:border-blue-400 focus:ring-blue-300',
          error && 'border-red-400  focus:ring-red-300 focus:border-red-400',
        )}
      />

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
    </div>
  )
}
