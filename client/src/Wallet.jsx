import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <p>Below you can find addresses for test and their initial balances</p>
      <ul>
  <li>
    "0x2d954be28042d8767836c754a06747a9718706b1": 100
  </li>
  <li>
  "0x67796ee2b751666b92c0a398bc087384dffefc21": 50
  </li>
  <li>
  "0xd33a60ef2d625da2553698c5cf1136263d0f3724": 75
  </li>
      </ul>
    </div>
  );
}

export default Wallet;
