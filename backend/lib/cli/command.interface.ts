import type DIContainer from "#lib/di/container.interface.ts"
import type DIRegistry from "#lib/di/registry.type.ts"
import type DTO from "#lib/dto/interface.ts"
import type { DTOOutput } from "#lib/dto/types.ts"

type CLICommand<
  Registry extends DIRegistry = DIRegistry,
  OptionDTO extends DTO = DTO,
  ArgDTO extends DTO = DTO,
> = {
  name: string
  description: string
  schemas?: { argument?: ArgDTO; options?: OptionDTO }
  run(params: {
    options: DTOOutput<OptionDTO>
    argument: DTOOutput<ArgDTO>
    container: DIContainer<Registry>
  }): void | Promise<void>
}

export default CLICommand
