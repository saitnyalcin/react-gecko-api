import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import coinBackButton from "../../assets/left-arrow.gif";

// shows the details of selected coin and provides some more information about it
const BitCoinDetails = () => {
  // set coin's state to store, control and selected the coins data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  // renders the coins details based on the selected coins's id
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (response.status === 200) {
          let data = await response.json();
          setData(data);
          setLoading(false);
        } else {
          throw new Error("Error fetching crypto currency list");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // parse the inner html tags within the text
  function createMarkup() {
    return { __html: data.description.en };
  }

  return (
    <div className="crypto-details">
      <Link to="/">
        <img src={coinBackButton} alt="back_image" width="100" height="100" />
      </Link>
      {loading && "Loading... Please wait.."}
      {data && (
        <div>
          <h1>
            <img src={data.image.thumb} alt="coin_image" /> {data.name}
          </h1>
          <div className="crypto-details-container">
            <div>
              {data.tickers.slice(0, 1).map((item) => (
                <p key={item.coin_id}>
                  Trust rank:
                  {(() => {
                    if (item.trust_score === "green")
                      return (
                        <span role="img" aria-label="good">
                          👍 🟢 Good
                        </span>
                      );
                    if (item.trust_score === "yellow")
                      return (
                        <span role="img" aria-label="fair">
                          🤝 🟡 Fair
                        </span>
                      );
                    if (item.trust_score === "red")
                      return (
                        <span role="img" aria-label="low">
                          👎 🔴 Low
                        </span>
                      );
                    else
                      return (
                        <span role="img" aria-label="low">
                          ❓Unknown
                        </span>
                      );
                  })()}
                </p>
              ))}
            </div>
            <p>
              <span role="img" aria-label="website">
                🌎{" "}
              </span>
              {data.links.homepage.slice(0, 1).map((item) => (
                <a href={item} key={item} target="_blank" rel="noreferrer">
                  {item}
                </a>
              ))}
            </p>
            <div>
              <span role="img" aria-label="currency">
                💰{" "}
              </span>
              {data.market_data.current_price.cad.toLocaleString("en-US", {
                style: "currency",
                currency: "CAD",
              })}
            </div>
            <div>
              <span role="img" aria-label="currency">
                🗓{" "}
              </span>
              Genesis Date: {new Date(data.genesis_date).getFullYear()}
            </div>
          </div>
          <b>Description:</b>
          <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}
    </div>
  );
};

export default BitCoinDetails;
