const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
})


const handler = async (event) => {
  try {
    let response ="none"
    if (event.body === "text"){
        response = "chat"
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: response
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
