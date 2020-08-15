export interface LinkModel {
  id: string
  url: string
  createdAt: Date
}

export const dbSchema: Array<Realm.ObjectClass | Realm.ObjectSchema> = [
  {
    name: 'Link',
    primaryKey: 'id',
    properties: {
      id: 'string',
      createdAt: 'date',
      url: 'string',
    },
  },
]
