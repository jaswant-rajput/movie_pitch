const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY
})


const handler = async (event) => {
  try {


    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: event.body
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
