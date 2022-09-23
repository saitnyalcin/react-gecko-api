import logo from '../logo.svg';

const Header = () => {
  return (
      <header className="App-header">
        <a
          className="App-link"
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
  );
}

export default Header;
