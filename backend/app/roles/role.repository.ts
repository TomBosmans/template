import roles from "./role.collection.ts"

type Name = (typeof roles)[number]["name"]

export default class RoleRepository {
  findOne(params: { where: { name: Name } }) {
    return roles.find((role) => role.name === params.where.name) || null
  }
}
