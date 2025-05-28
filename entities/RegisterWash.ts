export class WashEntity {
  constructor(
    public wash_location: string,
    public fk_user_id: number,
    public fk_feedback_id?: string,
    public reward?: boolean,
    public fk_reward_id?: string
  ) {}
}
