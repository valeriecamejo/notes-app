const app = require('./app')

const main = async () => {
  await app.listen(3000)
  console.log('Server on port 3000')
}

main()