const {onRequest} = require("firebase-functions/v2/https");

const { createProdia } = require("prodia");

const {defineString} = require("firebase-functions/params")

const prodiaKey = defineString("PRODIA_API_KEY");

const prodiaRequest = async (prompt) => {
  const prodia = createProdia({
    apiKey: prodiaKey.value(),
  });

  const job = await prodia.generate({
    prompt: prompt,
    model: "v1-5-pruned-emaonly.safetensors [d7049739]"
  });

  const { imageUrl, status } = await prodia.wait(job);

  if (status == "succeeded") {
    return imageUrl;
  } else {
    return "";
  }
}

exports.generateImage = onRequest(
  { cors: true },
  async (request, response) => {
    const prompt = request.body.data.prompt;

    const prodiaResponse = await prodiaRequest(prompt);

    if (prodiaResponse == "") {
      // request failed.
    }

    var imageab = await fetch(prodiaResponse, {
      method: 'GET'
    }).then((response) => response.arrayBuffer());

    response.send({
      "created": new Date(),
      "data": new Uint8Array(imageab)
    });
  });