import React, { useEffect, useState } from 'react'
import AuthenticationAPI from "../../services/coinGeckoService";

const CryptoData = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    await fetch(AuthenticationAPI.API_URL())
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className="crypto-container">
        {data
          .slice(0, 10)
          .map((crypto) => (
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
