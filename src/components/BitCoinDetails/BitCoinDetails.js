import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import coinBackButton from '../../assets/left-arrow.gif'

const BitCoinDetails = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
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
          setLoading(false)
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
      <Link to="/">
        <img src={coinBackButton} alt="back_image" width="100" height="100" />
      </Link>
      {loading && 'Loading... Please wait..'}
      {data && (
        <div>
          <h1>
            <img src={data.image.thumb} alt="coin_image" /> {data.name}
          </h1>
          <h3>
            {data.tickers.slice(0, 1).map((item) => (
              <p key={item.coin_id}>
                Trust rank:
                {(() => {
                  if (item.trust_score === 'green')
                    return (
                      <span role="img" aria-label="good">
                        👍 Good
                      </span>
                    )
                  if (item.trust_score === 'yellow')
                    return (
                      <span role="img" aria-label="good">
                        🤝 Fair
                      </span>
                    )
                  if (item.trust_score === 'red')
                    return (
                      <span role="img" aria-label="good">
                        👎 Low
                      </span>
                    )
                  else return <span>Unknown</span>
                })()}
              </p>
            ))}
          </h3>
          <h3>
            {data.links.homepage.slice(0, 1).map((item) => (
              <a href={item} key={item} target="_blank" rel="noreferrer">
                {item}
              </a>
            ))}
          </h3>
          <h3>
            {data.market_data.current_price.cad.toLocaleString('en-US', {
              style: 'currency',
              currency: 'CAD'
            })}
          </h3>
          <h3>Genesis Date: {new Date(data.genesis_date).getFullYear()}</h3>
          <b>Description:</b>
          <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}
    </div>
  )
}

export default BitCoinDetails
