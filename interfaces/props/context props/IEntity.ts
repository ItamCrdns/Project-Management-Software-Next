export interface IEntityProperties {
  pages: number
  count: number
}

export interface IEntity {
  projects: IEntityProperties
  tasks: IEntityProperties
  issues: IEntityProperties
}
