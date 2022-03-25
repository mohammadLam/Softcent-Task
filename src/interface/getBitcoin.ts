interface Response {
  bpi: Bpi
  disclaimer: string
  time: Time
}

interface Time {
  updated: string
  updatedISO: string
}

interface Bpi {
  [date: string]: number
}

export default Response
