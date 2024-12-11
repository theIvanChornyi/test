import { useEffect, useState } from "react"

export const useUserId = ():string | null => {
  const [userId,setUserId] = useState<string|null>( null)
  
  useEffect(() => {
    setUserId(localStorage?.getItem('bank-user') ?? null)
  }, [])
  
  return userId
}