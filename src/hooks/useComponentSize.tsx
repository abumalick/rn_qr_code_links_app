import {useState, useCallback} from 'react'
import {LayoutChangeEvent} from 'react-native'

type Size = {
  width: number
  height: number
}

interface OnLayout {
  (event: LayoutChangeEvent): void
}

interface useComponentSize {
  (firstRenderOnly?: boolean): [Size | null, OnLayout]
}

const useComponentSize: useComponentSize = (firstRenderOnly = false) => {
  const [size, setSize] = useState<Size | null>(null)
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {width, height} = event.nativeEvent.layout
      setSize((prevSize) => {
        if (prevSize && firstRenderOnly) return prevSize
        return {width, height}
      })
    },
    [firstRenderOnly],
  )

  return [size, onLayout]
}

export default useComponentSize
