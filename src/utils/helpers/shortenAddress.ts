const shortenAddress = (address: string, chars = 4) => {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}
export default shortenAddress
