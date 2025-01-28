import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button, { type ButtonProps } from "@mui/material/Button"
import { atom, useAtomValue, useSetAtom } from "jotai"
import { type PropsWithChildren, useEffect } from "react"
import {
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import type { ErrorMapCtx, ZodIssueOptionalMessage } from "zod"
import createInput from "./Input"
import type { Params } from "./types"

export default function createForm<T extends FieldValues>(params: Params<T>) {
  const errorsAtom = atom<FieldErrors<T>>({})
  const valuesAtom = atom<T>({} as T)

  function Form(
    props: PropsWithChildren<{ onSubmit: (data: T) => void; defaultValues?: DefaultValues<T> }>,
  ) {
    const setErrors = useSetAtom(errorsAtom)
    const setValues = useSetAtom(valuesAtom)
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
    const values = methods.watch()

    useEffect(() => {
      setErrors(methods.formState.errors)
      return () => setErrors({})
    }, [methods.formState.errors, setErrors])

    useEffect(() => {
      setValues(values)
      return () => setValues({} as T)
    }, [values, setValues])

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(props.onSubmit)}>{props.children}</form>
      </FormProvider>
    )
  }

  function FormErrors() {
    const errors = useAtomValue(errorsAtom) as FieldErrors<T>
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

  Form.SubmitButton = SubmitButton
  Form.Input = createInput<T>(params)
  Form.Errors = FormErrors

  return {
    Form,
    valuesAtom,
    errorsAtom,
  }
}
