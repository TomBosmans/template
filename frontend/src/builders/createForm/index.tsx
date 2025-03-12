import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button, { type ButtonProps } from "@mui/material/Button"
import type { ComponentProps, PropsWithChildren } from "react"
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type Path,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import type { ErrorMapCtx, ZodIssueOptionalMessage } from "zod"
import createInput from "./Input"
import type { OnSubmit, Params } from "./types"

export default function createForm<T extends FieldValues>(params: Params<T>) {
  function Form(
    props: PropsWithChildren<{ onSubmit: OnSubmit<T>; defaultValues?: DefaultValues<T> }>,
  ) {
    const { t } = useTranslation()
    const errorMap = (error: ZodIssueOptionalMessage, ctx: ErrorMapCtx) => {
      const isRequiredError = error.code === "invalid_type" && error.received === "undefined"
      const code = isRequiredError ? "required" : error.code
      return {
        message: t([`error.validation.${code}`], {
          ...error,
          defaultValue: ctx.defaultError,
        }).toString(),
      }
    }
    const methods = useForm<T>({
      resolver: zodResolver(params.schema, { errorMap }),
      mode: "onBlur",
      defaultValues: props.defaultValues,
    })

    const handleSubmit = (data: T) => {
      const result = props.onSubmit(data)
      if (result.success) return

      for (const [name, options] of Object.entries(result.errors)) {
        if (options)
          methods.setError(name as Path<T>, {
            message: t([`error.validation.${options.type}`], {
              ...options.error,
              defaultValue: options.message,
            }),
            type: options.type,
            types: options.types,
          })
      }
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>{props.children}</form>
      </FormProvider>
    )
  }

  function FormErrors() {
    const {
      formState: { errors },
    } = useFormContext()
    if (!errors.root) return null

    return <Alert severity="error">{errors.root.message}</Alert>
  }

  function SubmitButton(props: ButtonProps) {
    const { t } = useTranslation("translation", { keyPrefix: `form.${params.name}.submit` })
    const {
      formState: { isSubmitting },
    } = useFormContext()

    return (
      <Button type="submit" variant="contained" fullWidth loading={isSubmitting} {...props}>
        {t("label")}
      </Button>
    )
  }

  function Translate(props: ComponentProps<typeof Trans>) {
    const keyPrefix = `form.${params.name}`
    return <Trans {...props} i18nKey={`${keyPrefix}.${props.i18nKey}`} />
  }

  Form.SubmitButton = SubmitButton
  Form.Input = createInput<T>(params)
  Form.Errors = FormErrors
  Form.Translate = Translate

  return { Form }
}
