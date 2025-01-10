export default class User {
  public readonly id: string
  public readonly firstName: string
  public readonly lastName: string
  public readonly email: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(params: User) {
    this.id = params.id
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.email = params.email
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }
}
