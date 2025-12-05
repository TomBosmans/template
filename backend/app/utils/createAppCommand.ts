/** biome-ignore-all lint/suspicious/noExplicitAny: It is ok here */
import type AppRegistry from "#app/app.registry.ts"
import type CLICommand from "#lib/cli/command.interface.ts"
import type DTO from "#lib/dto/interface.ts"

export default function createAppCommand<
  OptionDTO extends DTO<any, any, any> = DTO<any, any, any>,
  ArgDTO extends DTO<any, any, any> = DTO<any, any, any>,
>(params: CLICommand<AppRegistry, OptionDTO, ArgDTO>) {
  return params
}
