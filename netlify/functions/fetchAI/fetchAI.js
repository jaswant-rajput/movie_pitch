const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
})


const handler = async (event) => {
  try {
    let response ="nooooone"
    if (event.body == "1"){
        response = "chat"
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: response,
        response: typeof event.body     
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
