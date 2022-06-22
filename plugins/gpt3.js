const Axios = require('axios');

let handler = async (m, { conn, text }) => {

  //only execute code if random number is less than 0.5
  var numero = Math.random();
  if (!text) text = m.text;
  if (numero <= 0.1 && text) {
    var data = JSON.stringify({
      "prompt": "Bot: Hola Soy un Bot y te puedo ayudar a conestar lo que sea hablo español muy bien.\nHumano: Mi nombre es " + m.name + "\nBot:Es un placer conocerte, ¿Cómo te puedo ayudar?\nHumano:" + text + "\nBot:",
      "max_tokens": 256,
      "temperature": 0.85,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "logprobs": null,
      "stop": "Humano:",
      "frequency_penalty": 0.6,
      "best_of": 1,
      "model": "text-babbage-001",
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
        var texto = response.data.choices[0].text.trim()
        m.reply(texto);
        //conn.sendMessage(m.chat, { text: response.data.choices[0].text.replace(/^\n|\n$/g, '') },);
        //conn.sendMessage(m.chat, { text: texto },);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// handler.command = /^(tellme)$/i
//handler.customPrefix = /.a+/s
handler.customPrefix = /(bile?k|ban?h|cum?|knt?l|y?|mmk|e|i|o|p|b(a|i)?c?(o|i)?(t|d)?|wibu|p(a)?nt(e)?k|pepe?k)/i
handler.command = new RegExp

module.exports = handler
