export class WashEntity {
  constructor(
    public wash_location: string,
    public fk_user_id: number,
    public reward: boolean,
    public points_gained: number,
    public fk_reward_id?: string
  ) {}
}
