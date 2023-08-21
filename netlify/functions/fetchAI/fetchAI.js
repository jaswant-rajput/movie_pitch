const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
})


const handler = async (event) => {
  try {
    
    
      const completion =await openai.completions.create({
          model:"text-davinci-003",
          prompt:event.body,
          max_tokens:700,
        })        
        const response = completion.choices[0].text
    
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: response,   
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
