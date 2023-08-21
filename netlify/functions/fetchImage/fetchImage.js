const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
})


const handler = async (event) => {
  try {
    
    
    const response =await openai.images.generate({
      prompt:event.body,
      n:1,
      size : "256x256"
    })
    const imageUrl = response.data[0].url
     
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: imageUrl,   
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
