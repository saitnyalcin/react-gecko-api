import React, { useEffect, useState } from 'react'
import bitcoinLoader from '../../assets/bitcoinLoading.gif'
import AuthenticationAPI from '../../services/coinGeckoService'
import BitCoin from '../BitCoin/BitCoin'

// fetches the whole coin's api data to render first 10 coins
const CryptoData = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(AuthenticationAPI.API_URL())
        if (response.status === 200) {
          let data = await response.json()
          setData(data)
          setLoading(false)
        } else {
          throw new Error('Error fetching crypto currency list')
        }
      } catch (error) {
        console.log(error)
      }
    }
    setTimeout(() => {
      fetchData()
    }, 1000)
  }, [])

  return (
    <div>
      {loading && (
        <div>
          <img
            src={bitcoinLoader}
            alt="crypto_image"
            width="100"
            height="100"
          />
        </div>
      )}
      <div className="crypto-container">
        {data &&
          data
            .slice(0, 10)
            .map((coin) => <BitCoin key={coin.id} bitcoin={coin} />)}
      </div>
    </div>
  )
}
export default CryptoData
