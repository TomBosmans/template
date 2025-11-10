import createZodDTO from "#lib/dto/zod.dto.ts"

export const SignInDTO = createZodDTO((z) =>
  z.object({ email: z.string().email(), password: z.string() }),
)
