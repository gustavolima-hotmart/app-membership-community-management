import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

type useClickOutsideProps = {
  callback: () => void
}
const useClickOutside = <T extends HTMLElement>({
  callback
}: useClickOutsideProps): RefObject<T> => {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (!ref.current) return

    const listener = (e: MouseEvent): void => {
      if (e.target && !ref.current?.contains(e.target as HTMLElement)) {
        callback()
      }
    }

    document.addEventListener('click', listener)

    return (): void => {
      document.removeEventListener('click', listener)
    }
  }, [callback])

  return ref
}

export default useClickOutside
