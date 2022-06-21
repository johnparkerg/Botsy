const Axios = require('axios');

let handler = async (m, { conn, text }) => {

  //only execute code if random number is less than 0.5
  //if (Math.random() > 0.1) {
  if (true) {
    if (!text) throw 'You must provide a message!'
    var data = JSON.stringify({
      "prompt": "Bot: Hola Soy un Bot y te puedo ayudar a conestar lo que sea hablo español muy bien.\n\nHumano:" + text + "\nBot:",
      "max_tokens": 256,
      "temperature": 0.85,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "logprobs": null,
      "stop": "Humano:",
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
        var texto = response.data.choices[0].text.replace(/^\n|\n$/g, '')
        //m.reply(response.data.choices[0].text.replace(/^\n|\n$/g, ''));
        //conn.sendMessage(m.chat, { text: response.data.choices[0].text.replace(/^\n|\n$/g, '') },);
        conn.sendMessage(m.chat, { text: texto },);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

handler.command = /^(tellme)$/i
// handler.customPrefix = /(.*?)/i
// handler.command = new RegExp

module.exports = handler
