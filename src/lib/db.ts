export interface LinkModel {
  id: string
  url: string
}

export const dbSchema: Array<Realm.ObjectClass | Realm.ObjectSchema> = [
  {
    name: 'Link',
    primaryKey: 'id',
    properties: {
      id: 'string',
      url: 'string',
    },
  },
]
