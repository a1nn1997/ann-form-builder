const { connect } = require('mongoose')
const config = require('config')
//const dbURI = 'mongodb+srv://a1nn1997:1234@realestate.w1apo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' //config.get('mongo-link')

const dbConnect = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    console.log("Successful Database Connection!")
  } catch (er) {
    console.error(er.message)
    process.exit(1)
  }
}

module.exports = dbConnect
