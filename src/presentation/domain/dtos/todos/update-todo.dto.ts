
export class UpdateTodoDto {

  private constructor(
    public readonly id:number,
    public readonly title?:string,
    public readonly completedAt?: Date
  ){}

  get values() {
    const returnObj:{[key: string]:any} = {}

    if (this.title) returnObj.title = this.title;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: {[key:string]: any}): [string?, UpdateTodoDto?] {

    const { id, title, completedAt } = props;

    if (!id || isNaN(Number(id))) return ['ID must be a valid number'];

    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt)
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['CompletedAt must be a valid date']
      }
    }


    return [undefined, new UpdateTodoDto(id, title, newCompletedAt)];

  }

}