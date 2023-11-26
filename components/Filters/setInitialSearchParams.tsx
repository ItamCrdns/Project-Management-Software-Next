import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// ? Will only execute once. Will return a string with the initial search params
export const setInitialSearchParams = (): URLSearchParams => {
  const searchParams = useSearchParams()

  const [initialSearchParams, setInitialSearchParams] =
    useState<URLSearchParams>(new URLSearchParams())

  useEffect(() => {
    // * Create a new URLSearchParams object. Only once
    const newURLSearchParams = new URLSearchParams()

    if (newURLSearchParams.toString() === '') {
      // * Iterate all the existing search params in the current URL (Dont worry will get em all)
      for (const [key, value] of Array.from(searchParams)) {
        // * Append them to a new URLSearchParams object and add the new search params to the URL.
        newURLSearchParams.append(key, value)
        setInitialSearchParams(newURLSearchParams)
      }
    }
  }, [searchParams])

  return initialSearchParams
}
