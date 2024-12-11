import axios from "axios"
import { useEffect } from "react"

const createNewUser = async(): Promise<void> => {
    const { data: newUser } = await axios.post('http://localhost:8080/user/create')
    localStorage.setItem('bank-user', newUser.id)
}

const onPageInit = async (): Promise<void> => {
  try {
    const userId = localStorage.getItem('bank-user')
    if (!userId) {
      await createNewUser()
    } else {
      const {data:currentUser} = await axios.get(`http://localhost:8080/user/${userId}`)
      localStorage.setItem('bank-user', currentUser.id)
    }
  } catch {
    localStorage.removeItem('bank-user')
    await createNewUser()
  }
}

export const useOnAppInit = () => {
  useEffect(() => {
    onPageInit()
  }, [])
}