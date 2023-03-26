const express = require('express')
const app = express()
const port = 3000
const token = "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"
app.use(express.json())    // <==== parse request body as JSON
// 3000 words should be max 



app.post('/',(req,res)=>{
  console.log(req)
  postData(req.body.prompt).then((data) => {res.send(data)})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})

async function postData(prompt) {
  
  const input = prompt;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 128,
    }),
  });
  const result = await response.json();
  console.log(result);
  if (result.error) {
    return {status: 500,
            error: result.error};
  }
  else
  {
    return result.choices[0].text.trim();
  }
}
module.exports = app
