const { default: OpenAI } = require("openai")


const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
})


const handler = async (event) => {
  try {
    const response = "none"
    if (event.body == "1"){
        const completion =await openai.completions.create({
          model:"text-davinci-002",
          prompt:event.body.userPrompt,
          max_tokens:event.body.max_tokens
        })        

        response = completion.choices[0].text

    }else{

    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: response,
        response:event.body     
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
