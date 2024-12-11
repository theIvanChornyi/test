'use client'
import { FC, useCallback, useEffect, useState, } from "react"
import axios from "axios"
import Title from "../../shared/components/title/title.component"
import { ITransaction } from "../../shared/types/transactions.type"
import Button from "../../shared/components/button/button.component"
import css from './transactions.style.module.css'
import clsx from "clsx"
import { useUserId } from "../../hooks/useUserId"

interface IProps {
  style?:string
}


const Transactions: FC<IProps> = ({ style }) => {
  const userId = useUserId()
  const [userTransactions, setUserTransactions] = useState<Array<ITransaction>>([])
  const [page, setPage] = useState(1)
  
  const incrementPage = () => setPage(p => {
    return p + 1
  })
  const decrementPage = () => setPage(p => {
    if (p <= 1) {return 1 }
    return p-1
  })

   const getUserTransactions = useCallback(async () => {
     const { data } = await axios.get(`${process.env.BACKEND_URL}/transaction`, {
       params: {
        page,
        userId
     }})
     setUserTransactions(data)
  },[userId,page])


  useEffect(() => {
    if (userId) {
      getUserTransactions()
    }
  },[getUserTransactions, userId])

  return <section className={clsx(style,css.section)}>
    <Title as="h3">Transactions</Title>

    <div className={css.tableWrapper}>
      <table className={css.table}>
      <thead>
        <tr>
        <th>Type</th>
        <th>Amount</th>
        <th>from</th>
        <th>to</th>
        <th>Time</th>
      </tr>
      </thead>
      <tbody>
        {userTransactions.map(({amount,createdAt,from,to,id,currency,type}) => {
        return <tr key={id}>
          <td>{type}</td>
          <td>{`${amount} ${currency}`}</td>
          <td>{from}</td>
          <td>{to}</td>
          <td>{createdAt}</td>
      </tr>
      })}
      </tbody>
    </table>
    </div>
    <ul className={css.buttonsList}>
      <li><Button onClick={decrementPage}  text="Prev" /></li>
      <li><Button onClick={incrementPage} text="Next"/></li>
    </ul>
  </section>
 }

export default Transactions