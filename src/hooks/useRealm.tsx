import {useState, useEffect} from 'react'
import Realm from 'realm'

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
  return {realm}
}

export default useRealm
