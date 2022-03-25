interface CurrentRate {
  time: Time
  disclaimer: string
  bpi: Bpi
}

interface Bpi {
  [currency: string]: USD
}

interface USD {
  code: string
  rate: string
  description: string
  rate_float: number
}

interface Time {
  updated: string
  updatedISO: string
  updateduk: string
}

export default CurrentRate
