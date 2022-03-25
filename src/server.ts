import express, { Request, Response } from 'express'
import axios from 'axios'
import GetBitcoinResponse from './interface/getBitcoin'
import CurrentRateResponse from './interface/currentRate'

const app = express()

app.use(express.json())

// Get Bitcoin Information Route
app.get('/getBitcoinInfo', async (req: Request, res: Response) => {
  const { currency }: { currency: string } = req.body

  // if currency is not provided
  if (!currency) {
    return res.status(400).json({
      error: 'Missing currency parameter'
    })
  }

  const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05&currency=${currency}`

  try {
    // fetch bitcoin information from coindesk
    const getBitcoinInfo = await axios.get<GetBitcoinResponse>(url)

    // destructuring the response
    const { status, data } = getBitcoinInfo

    // if the request was successful
    if (status === 200) {
      const values = Object.values(data.bpi) // get the values from the response
      const maximum = Math.max(...values) // get the maximum value from the values
      const minimum = Math.min(...values) // get the minimum value from the values

      try {
        // fetch the current bitcoin rate
        const getCurrentBitcoinRate = await axios.get<CurrentRateResponse>(
          `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
        )

        // get the current rate from the response
        const currentRate = getCurrentBitcoinRate.data.bpi[currency].rate

        // return the response
        return res.json({
          maximum,
          minimum,
          currentRate
        })
      } catch (err: any) {
        return res.json({ error: err.message })
      }
    }

    return res.json({
      error: "Couldn't fetch data from coindesk"
    })
  } catch (err: any) {
    return res.json({ error: err.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
