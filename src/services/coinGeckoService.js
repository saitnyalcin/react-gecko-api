// crypto api url to be used as a service across the application
const coinGeckoService = {
  API_URL() {
    return 'https://api.coingecko.com/api/v3/coins/'
  }
}

export { coinGeckoService as default }
