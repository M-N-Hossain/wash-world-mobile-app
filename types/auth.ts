export class LoginUserDto {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

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

export type UserState = {
  token: string;
  errormessage: string;
  isLoadingUser: boolean;
  user_profile: {
    id: number;
    firstName: string;
    lastName: string;
    licensePlate: string;
    email: string;
    subscription: string;
  };
}; 