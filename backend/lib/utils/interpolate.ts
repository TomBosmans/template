// TODO: remove lodash dependency
import lodash from "lodash"

export default function interpolate<T>(template: string, vars: Record<string, unknown>): T {
  if (template === "") throw new ReferenceError("Empty template")

  return JSON.parse(template, (_, rawValue) => {
    if (!rawValue || rawValue[0] !== "$") return rawValue

    const name = rawValue.slice(2, -1)
    const value = lodash.get(vars, name)
    if (typeof value !== "undefined") return value

    throw new ReferenceError(`Variable ${name} is not defined`)
  })
}
