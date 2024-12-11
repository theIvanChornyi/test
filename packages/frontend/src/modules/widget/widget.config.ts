import { IWidget } from './widget.types'

import SendIco from '../../../public/icons/send.svg'
import ReceiveIco from '../../../public/icons/receive.svg'
import MoreIco from '../../../public/icons/more.svg'

export const widgetConfig : Array<IWidget> = [
  {
    name: 'Add Iban',
    ico: MoreIco,
    href : "ADD_IBAN"
  },
  {
    name: 'Withdraw',
    ico: ReceiveIco,
    href : "WITHDRAW"

  },
  {
    name: 'Deposit',
    ico: SendIco,
    href : "DEPOSIT"
  },
]