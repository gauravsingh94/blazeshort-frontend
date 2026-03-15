'use client'

import { Input } from '@/components/ui/input'
import { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  id?: string
  type?: string
  name?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
  helperText?: string
  error?: string
  inputClassName?: string
}

export function FormField({
  label,
  id,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  helperText,
  error,
  inputClassName = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && '*'}
      </label>
      <Input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={inputClassName}
      />
      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
