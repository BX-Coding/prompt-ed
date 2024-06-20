const {onRequest} = require("firebase-functions/v2/https");

const { createProdia } = require("prodia");

const prodiaKey = process.env.NEXT_PUBLIC_PRODIA_API_KEY;

const prodia = createProdia({
  apiKey: prodiaKey,
});

const prodiaRequest = async (prompt) => {
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
    const prodiaResponse = await prodiaRequest(prompt);

    if (prodiaResponse == "") {
      // request failed.
    }

    imageab = await fetch(prodiaResponse, {
      method: 'GET'
    }).then((response) => response.arrayBuffer());

    response.send({
      "created": new Date(),
      "data": new Uint8Array(imageab)
    });
  });