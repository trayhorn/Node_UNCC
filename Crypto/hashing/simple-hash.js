// A simple hash function for non-cryptographic purposes

function simpleHash(message) {
  const primes = [
    84845549, 72580867, 10802117, 21950483, 91065707, 93028517, 16404161,
    15936343, 35272049, 74964821,
  ];

  for (let i = 0; i < message.length; i++) {
    let temp = message[i] * primes[i % 10];
    message[i] = message[i] ^ temp;
  }

  for (let i = 0; i < message.length; i++) {
    message[i] = message[i] >> 2; // shift the data to the right by 2 bits
  }

  let result = 0;

  for (let i = 0; i < message.length; i++) {
    result += message[i] * primes[i % 10];
    result = result % 100000000;
  }

  const resultBuffer = Buffer.alloc(4);
  resultBuffer.writeUInt32BE(result, 0);

  return resultBuffer;
}

const digest = simpleHash(Buffer.from("Sample message to hash", "utf-8"));

console.log(digest.toString("hex"));
