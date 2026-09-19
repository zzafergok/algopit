'use client';

import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input, type InputProps } from '@/components/core/input';
import { FormField } from './form-field';

export interface FormInputProps extends InputProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, description, required, className, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = errors[name]?.message as string | undefined;

    return (
      <FormField
        label={label}
        htmlFor={name}
        error={error}
        description={description}
        required={required}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              {...props}
              id={name}
              ref={ref || field.ref}
              className={className}
            />
          )}
        />
      </FormField>
    );
  },
);

FormInput.displayName = 'FormInput';
