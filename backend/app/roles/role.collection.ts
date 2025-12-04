import type { Role } from "./role.entities.ts"

export const adminRole = {
  name: "admin",
  rules: [
    { action: "crud", subject: "User" },
    { action: "crud", subject: "Session" },
  ],
} as const satisfies Role

export const userRole = {
  name: "user",
  rules: [
    { action: "read", subject: "User" },
    { action: "update", subject: "User", conditions: { id: `\${user.id}` } },
  ],
} as const satisfies Role

const roles = [adminRole, userRole] as const
export default roles
