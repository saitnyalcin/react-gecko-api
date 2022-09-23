import React, { useEffect, useState } from 'react'
import AuthenticationAPI from '../../services/coinGeckoService'
import bitcoinLoader from '../../assets/bitcoinLoading.gif'


const CryptoData = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    await fetch(AuthenticationAPI.API_URL())
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data)
          setLoading(false)
        }
      })
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 3000)
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
        {data.slice(0, 10).map((crypto) => (
          <div key={crypto.id}>
            <div>
              <div className="crypto-title">{crypto.name}</div>
              <img
                src={crypto.image.large}
                alt="crypto_image"
                width="100"
                height="100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CryptoData
