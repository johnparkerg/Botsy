const Axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) throw 'You must provide a message!'
  var data = JSON.stringify({
    "prompt": "Bot: Hello, I am an intelligent robot, tell me something and I'll do my best to answer.\n\nHuman:" + text + "\nBot:",
    "max_tokens": 256,
    "temperature": 0.85,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
    "stop": "\n\n",
    "frequency_penalty": 0.6,
    "best_of": 1,
    "model": "text-davinci-002",
  });

  var config = {
    method: 'post',
    url: 'https://api.openai.com/v1/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    },
    data: data
  };

  await Axios(config)
    .then(function (response) {
      conn.sendMessage(m.chat, { text: response.data.choices[0].text },);
    })
    .catch(function (error) {
      console.log(error);
    });
}

handler.command = /^(tellme)$/i

module.exports = handler
