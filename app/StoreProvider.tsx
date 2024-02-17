'use client'

import { store, type AppStore } from '@/lib/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const storeRef = useRef<AppStore>()

  if (storeRef.current === undefined) {
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
