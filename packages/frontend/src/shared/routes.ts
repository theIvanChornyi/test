export const FRONT_ROUTES = {
  HOME: '/',
  ADD_IBAN: 'add-iban',
  DEPOSIT: 'deposit',
  WITHDRAW:'withdraw'
}

export const BACKEND_ROUTES = {
  USER: "user/:userId",
  USER_CREATE:'/user/create',
  USER_IBAN: '/iban/:userId',
  USER_IBAN_ADD: '/iban/add',
  DEPOSIT: "/payment/deposit",
  WITHDRAW: '/payment/withdraw',
  TRANSACTION: '/transaction',
  TRANSACTION_CREATE:'/transaction/create'
}