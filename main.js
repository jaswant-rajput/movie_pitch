



// import { OpenAI } from "openai"


// const openai = new OpenAI({
//   apiKey : process.env.apiKey,
//   dangerouslyAllowBrowser: true
// })


const button = document.getElementById("send-btn")
const url1 = "https://warm-snickerdoodle-ee4999.netlify.app/.netlify/functions/fetchAI"
const url2 = "https://warm-snickerdoodle-ee4999.netlify.app/.netlify/functions/fetchAI2"
const urlImage = "https://warm-snickerdoodle-ee4999.netlify.app/.netlify/functions/fetchImage"
button.addEventListener("click",function(){
  const userInput = document.getElementById("setup-textarea").value
  if (userInput){
  createBotReply(userInput)
  }

})

async function createBotReply(outline){  
  const bossMessage = document.getElementById("boss-message")
  bossMessage.innerText = "Ok, just wait a second while my digital brain digests that..."

  const prompt = `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: Two dogs fall in love and move to Hawaii to learn to surf.
    message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
    ###
    outline:A plane crashes in the jungle and the passengers have to walk 1000km to safety.
    message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
    ###
    outline: A group of corrupt lawyers try to send an innocent woman to jail.
    message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
    ###
    outline: ${outline}
    message: 
    `


  const response = await fetch(url2,{
    method:"POST",
    mode : "no-cors",
    headers: {
      "content-type":"text/plain"
    },
    body: prompt,

  })

  const data = await response.json()
  bossMessage.innerText = data.message
  
  createSynopsis(outline)
}

async function createSynopsis(outline){
  const outputText = document.getElementById("output-text")

  const prompt = `Generate an engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors names in brackets after each character. Choose actors that would be ideal for this role. 
    ###
    outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. 
    When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). 
    But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis).
    Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life.
     As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
    ###
    outline: ${outline}
    synopsis:
    `

  const response = await fetch(url1,{
    method:"POST",
    mode : "no-cors",
    headers: {
      "content-type":"text/plain"
    },
    body: prompt
  })
  
  const data = await response.json()
  const synopsis = data.message
  
  
  const title = createTitle(synopsis)
  const stars = createStars(synopsis)
  outputText.innerText = synopsis
  createImagePrompt(synopsis)
}

async function createTitle(synopsis){
  const outputTitle = document.getElementById("output-title")
  const prompt = `Generate an alluring title based on the synopsis ${synopsis} `

  const response = await fetch(url1,{
    method:"POST",
    mode : "no-cors",
    headers: {
      "content-type":"text/plain"
    },
    body: prompt,
  })
  const title = await response.json()
  outputTitle.innerText = title.message
  return title.message
}

async function createStars(synopsis){
  const outputStars = document.getElementById("output-stars")

  
    
    const prompt = `Extract the names in brackets from the synopsis.
    ###
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills.
    When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, 
    his reckless attitude and cocky demeanor put him at odds with the other pilots, 
    especially the cool and collected Iceman (Val Kilmer).
    But Maverick isn't only competing to be the top fighter pilot,
    he's also fighting for the attention of his beautiful flight instructor, 
    Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte,
     but struggles to balance his personal and professional life. 
    As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
    names: Tom Cruise, Val Kilmer, Kelly McGillis
    ###
    synopsis: ${synopsis}
    names:   
    `
  
    const response = await fetch(url2,{
      method:"POST",
      mode : "no-cors",
      headers: {
        "content-type":"text/plain"
      },
      body: prompt,
    })
  
  const starNames = await response.json()
  
  outputStars.innerText = starNames.message
  return starNames.message
}


async function createImagePrompt(synopsis){

  const prompt = `Give a short description of an image which could be used to advertise a movie based on the synopsis. The description should be rich in visual detail .
    ###
    synopsis: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
    image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
    ###
    synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
    image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
    ###
    synopsis: ${synopsis}
    image description: 
    `
    const response = await fetch(url1,{
      method:"POST",
      mode : "no-cors",
      headers: {
        "content-type":"text/plain"
      },
      body: prompt,
    })

  const imagePrompt = await response.json()
  // console.log(imagePrompt.message)
  createImage(imagePrompt.message)

}

async function createImage(imagePrompt){

const imageContainer = document.getElementById("output-img-container")
console.log(imagePrompt)
const response = await fetch(urlImage,{
  method:"POST",
  mode : "no-cors",
  headers: {
    "content-type":"text/plain"
  },
  body: prompt,
})

const imageUrl = await response.json()

  imageContainer.innerHTML = `<img src="${imageUrl.message}">`

  const setupInputContainer = document.getElementById("setup-input-container")
  setupInputContainer.innerHTML = `<button class="view-pitch-btn" id="view-pitch-btn"> View pitch </button>`
  document.getElementById("view-pitch-btn").addEventListener("click",function(){
    document.getElementById("setup-container").style.display = "none"
    document.getElementById("output-container").style.display = "flex"
  })



}