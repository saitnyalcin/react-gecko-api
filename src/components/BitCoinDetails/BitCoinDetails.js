import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const BitCoinDetails = () => {
  const [data, setData] = useState(null)
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        )
        if (response.status === 200) {
          let data = await response.json()
          setData(data)
        } else {
          throw new Error('Error fetching users list')
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  function createMarkup() {
    return { __html: data.description.en }
  }

  return (
    <div className="crypto-details">
      <Link to="/">Back home</Link>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <h2>Year of Est : {new Date(data.genesis_date).getFullYear()}</h2>

          <img src={data.image.large} alt="coin_image" />
          <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}
    </div>
  )
}

export default BitCoinDetails
