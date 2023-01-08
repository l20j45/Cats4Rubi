const apiKey =
  "live_hzpahfMJlivoaLO6wT3jeoOdJJcVgfHnOkrbP4uBsMxtXHn2ul4kdl86f77n9BPN";
let apiEndpoints = {
  0: "https://api.thecatapi.com/v1/images/search?limit=4",
  1: `https://api.thecatapi.com/v1/images/search?${apiKey}`,
  2: `https://api.thecatapi.com/v1/favourites`,
  3: `https://api.thecatapi.com/v1/favourites`,
};
let tagClases = {
  0: "#cardImage",
  1: "#cardImageFavorite",
};
let imagesTags = [0, 1, 2, 3];

/* const petition = async (urlApi) => {
  const response = await (await fetch(urlApi)).json();
  return response;
}; */

async function initialStatesRandom() {
  try {
    const res = await fetch(`${apiEndpoints[0]}`);
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesRandom: ${res.status}`
      );
    const jsonresponse = await res.json();

    for (element of imagesTags) {
      const img = document.querySelector(`${tagClases[0]}${element}`);
      img.src = jsonresponse[element].url;
    }
  } catch (error) {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
}

async function initialStatesFavorites() {
  try {
    const res = await fetch(`${apiEndpoints[3]}`, {
      headers: {
        'x-api-key': apiKey,
        'content-type': 'application/json'
    },
    });
    const jsonresponse = await res.json();
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesFavorites: ${res}`
      );
    for (element of imagesTags) {
      const img2 = document.querySelector(`${tagClases[1]}${element}`);
      img2.src = jsonresponse[element]?.image.url;
    }
  } catch (error) {
    console.error(error.message);
    const spanErrorFavorite = document.getElementById("spanErrorFavorite");
    spanErrorFavorite.innerText = `Error: ${error.message}`;
  }
}

async function saveFavorites() {
  try {
    const res = await fetch(`${apiEndpoints[2]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key:": `${apiKey}`,
      },
      body: JSON.stringify({
        image_id: "dje",
      }),
    });

    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesRandom: ${res.status}`
      );
  } catch (error) {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
}

async function reloadImages(Api = 0, identifier = 0, form = 0) {
  try {
    const res = await fetch(`${apiEndpoints[Api]}`);
    const jsonresponse = await res.json();
    const img = document.querySelector(`${tagClases[form]}${identifier}`);
    img.src = jsonresponse[0].url;
  } catch (error) {
    console.error(error.message);
  }
}

initialStatesRandom();
//initialStatesFavorites();

/* reload("", 1);
reload("", 2);
reload("", 3);
reload("", 4); */
