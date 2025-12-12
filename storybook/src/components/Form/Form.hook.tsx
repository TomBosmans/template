import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import Button from "../Button"
import Field, { type Props as FieldProps } from "../input/Field"

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    TextField: (props: FieldProps) => {
      const field = useFieldContext<string>()
      return (
        <Field
          {...props}
          value={field.state.value}
          type="text"
          error={
            field.state.meta.isTouched
              ? field.state.meta.errors.map((e) => e.message).join(", ")
              : undefined
          }
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )
    },

    NumberField: (props: FieldProps) => {
      const field = useFieldContext<number>()
      return (
        <Field
          {...props}
          value={field.state.value}
          type="number"
          error={field.state.meta.errors.join(", ")}
          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
        />
      )
    },
  },

  formComponents: {
    Submit: ({ label, className }: { label: string; className?: string }) => {
      const form = useFormContext()

      return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button color="primary" className={className} type="submit" disabled={isSubmitting}>
              {label}
            </Button>
          )}
        </form.Subscribe>
      )
    },
  },
})

export default useAppForm
