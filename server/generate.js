const secp = require("ethereum-cryptography/secp256k1");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

// const privateKey = secp.utils.randomPrivateKey();
// const publicKey = secp.getPublicKey(privateKey);
// const kec = keccak256(publicKey.slice(1)).slice(-20);
// const pubNorm = '0x' + toHex(kec).toString();
// first
// 41a1693dcc1efe408efdbd2ba64f3aeceb76b8216b2d0f9f379967f5be928a71
// 04ab269456b5ab90c9d9ca852ef80f5e53afec6d1fb4e98b21686f921a7e32081049217bd82963243d1ed9487f629bcc4eea78113e83c792fd6fa53ed71554db99
// 0x2d954be28042d8767836c754a06747a9718706b1

// second
// ccb4641a7c1dbe0207118883b9969b17421d5042971ae3fc70fadbbb4b2585ca
// 0439aafd89087e1694673fa840725e2b4ed6d5116b81b2909bb060d1c7b3cc3a35a1a129ce62409ed190618291f058c624970ec79268cd2fc393812fa87274973b
// 0x67796ee2b751666b92c0a398bc087384dffefc21

// third
// c1c5440a23e15896af38a29059ec8fcc1b7b63c2f40a9fbde8c2d42dd1ba4ae0
// 048948b222d2812c1a1489b7e093373d461bd78c220c4469eee81649279ff897f7fd2223da5161d4c0deb82eeafa9f5d27e722ae09080a0b2086a1af596e7483d0
// 0xd33a60ef2d625da2553698c5cf1136263d0f3724


// console.log('priv ,', toHex(privateKey));
// console.log('pub ,', toHex(publicKey));
// console.log('kec ,', toHex(kec));
// console.log('norm ,', pubNorm);


const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
//04385c3a6ec0b9d57a4330dbd6284989be5bd00e41c535f9ca39b6ae7c521b81cd2443fef29e7f34aa8c8002eceaff422cd1f622bb4830714110e736044d8f084f
const publicKey = secp.getPublicKey(PRIVATE_KEY);
const kec = keccak256(publicKey.slice(1)).slice(-20);
const recoveryBit = keccak256(publicKey.slice(1))

//console.log('recover', recoveryBit)
//console.log("publicKey", toHex(publicKey))

function hashMessage(msg) {
    return keccak256(utf8ToBytes(msg));
}
let signature;
async function signMessage(msg) {
   const hash = hashMessage(msg);
   return signature = await secp.sign(hash, PRIVATE_KEY, {recovered: true});

}
signMessage('50').then((signature) => {
    console.log('msg ', [...signature]);
  }).catch((error) => {
    console.error(error);
  });

//     async function signMessage(msg) {
//    const hash = hashMessage(msg);
//    const signature = await secp.sign(hash, PRIVATE_KEY, {recovered: true});
//     return signature;
// }

//   async function recoverKey(message, recoveryBit) {
//     const hash = hashMessage(message);
//     const signature = await secp.sign(hash, PRIVATE_KEY, {recovered: true});
//     const recover = secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
//     return recover;
// }

// recoverKey('50'. recoveryBit).then((recover) => {
//     console.log('msg ', recover);
//   }).catch((error) => {
//     console.error(error);
//   });
