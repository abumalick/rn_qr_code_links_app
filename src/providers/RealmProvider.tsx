import React, {createContext, useContext, useEffect, useState} from 'react'
import Realm from 'realm'

export const RealmContext = createContext<Realm | undefined>(undefined)

const useRealm = (schema: Array<Realm.ObjectClass | Realm.ObjectSchema>) => {
  const [realm, setRealm] = useState<Realm>()
  useEffect(() => {
    const realmPromise = Realm.open({
      schema: schema,
    })
    realmPromise.then((_realm) => {
      setRealm(_realm)
    })
    return () => {
      realmPromise.then((_realm) => {
        if (_realm && !_realm.isClosed) {
          _realm.close()
        }
      })
    }
  }, [schema])
  return realm
}

type RealmProviderProps = {
  loadingComponent?: React.ReactElement
  schema: Array<Realm.ObjectClass | Realm.ObjectSchema>
}

const RealmProvider: React.FC<RealmProviderProps> = ({
  children,
  schema,
  loadingComponent,
}) => {
  const realm = useRealm(schema)
  const childrenToRender =
    !!loadingComponent && !realm ? loadingComponent : children
  return (
    <RealmContext.Provider value={realm}>
      {childrenToRender}
    </RealmContext.Provider>
  )
}

export default RealmProvider

export const useRealmContext = () => {
  return useContext(RealmContext)
}

export const useRealmOrThrow = () => {
  const realm = useContext(RealmContext)
  if (!realm) {
    throw new Error('Database is not loaded')
  }
  return realm
}
