export class Feedback {
  constructor(
    public title: string,
    public description: string,
    public rating: string,
    public userId: string,
    public washId: string,
    public washLocation: string,
    public problemId?: string
  ) {}
}
