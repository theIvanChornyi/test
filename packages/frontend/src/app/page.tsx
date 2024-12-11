'use client'
import css from "./page.module.css";
import ActionsSidebar from "../modules/actions-sidebar/actions-sidebar.component";
import Transactions from "../modules/transactions/transactions.component";
import clsx from "clsx";
import { roboto } from "../shared/fonts";
import { useOnAppInit } from "../hooks/useOnAppInit";



export default function Home() {
  useOnAppInit()
  return (
    <main className={clsx(css.page, roboto.className)}>
      <div className={css.mainSection}>
        <Transactions/>
      </div>
      <ActionsSidebar/>
  </main>
  );
}
