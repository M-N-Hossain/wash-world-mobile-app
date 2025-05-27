export class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public licensePlate: string,
    public subscriptionId: string,
    public email: string,
    public password: string
  ) {}
}
