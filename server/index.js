const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "0x2d954be28042d8767836c754a06747a9718706b1": 100,
  "0x67796ee2b751666b92c0a398bc087384dffefc21": 50,
  "0xd33a60ef2d625da2553698c5cf1136263d0f3724": 75,
};

const private = {
  "0x2d954be28042d8767836c754a06747a9718706b1": "41a1693dcc1efe408efdbd2ba64f3aeceb76b8216b2d0f9f379967f5be928a71",
  "0x67796ee2b751666b92c0a398bc087384dffefc21": 'ccb4641a7c1dbe0207118883b9969b17421d5042971ae3fc70fadbbb4b2585ca',
  "0xd33a60ef2d625da2553698c5cf1136263d0f3724": 'c1c5440a23e15896af38a29059ec8fcc1b7b63c2f40a9fbde8c2d42dd1ba4ae0',
};

const public = {
  '41a1693dcc1efe408efdbd2ba64f3aeceb76b8216b2d0f9f379967f5be928a71':'04ab269456b5ab90c9d9ca852ef80f5e53afec6d1fb4e98b21686f921a7e32081049217bd82963243d1ed9487f629bcc4eea78113e83c792fd6fa53ed71554db99',
  'ccb4641a7c1dbe0207118883b9969b17421d5042971ae3fc70fadbbb4b2585ca': '0439aafd89087e1694673fa840725e2b4ed6d5116b81b2909bb060d1c7b3cc3a35a1a129ce62409ed190618291f058c624970ec79268cd2fc393812fa87274973b',
  'c1c5440a23e15896af38a29059ec8fcc1b7b63c2f40a9fbde8c2d42dd1ba4ae0': '048948b222d2812c1a1489b7e093373d461bd78c220c4469eee81649279ff897f7fd2223da5161d4c0deb82eeafa9f5d27e722ae09080a0b2086a1af596e7483d0',

}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", async (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  const hash = keccak256(utf8ToBytes(amount.toString()));
  const privatKey = private[sender];
  const signature = await secp.sign(hash, privatKey);
  const isSigned = secp.verify(signature, hash, public[privatKey]);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } 
  if (!isSigned) {
    res.status(400).send({ message: "You aren't a owner!" });
  } 
  else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ 
      balance: balances[sender], 
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
