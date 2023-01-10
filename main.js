const apiKey =
  "live_hzpahfMJlivoaLO6wT3jeoOdJJcVgfHnOkrbP4uBsMxtXHn2ul4kdl86f77n9BPN";
let apiEndpoints = {
  searchOneImages: "https://api.thecatapi.com/v1/images/search",
  searchFourImages: "https://api.thecatapi.com/v1/images/search?limit=4",
  favoritesImages: `https://api.thecatapi.com/v1/favourites/`,
  uploadImages: `https://api.thecatapi.com/v1/images/upload`,
};
/* let tagClases = {
  0: "#cardImage",
  1: "#cardImageFavorite",
}; */

const API_URL_FAVOTITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/`;

let titles = ["Have", "a", "nice", "day"];

/* const petition = async (urlApi) => {
  const response = await (await fetch(urlApi)).json();
  return response;
}; */

async function initialStatesRandom() {
  try {
    const res = await fetch(`${apiEndpoints["searchFourImages"]}`);
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesRandom: ${res.status}`
      );
    const data = await res.json();

    for (let element = 0; element < 4; element++) {
      const cardRandomContainer = document.querySelector(".container");
      const article = document.createElement("article");
      const h3 = document.createElement("h3");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const btnReload = document.createElement("button");
      const btnFavorite = document.createElement("button");
      article.classList.add("card");
      h3.classList.add("cardTitle");
      h3.innerText = titles[element];
      img.classList.add("cardImage");
      btnReload.classList.add("reloadRandom");
      btnReload.innerText = "Change image";
      btnFavorite.classList.add("saveFavorite");
      btnFavorite.innerText = "Save in favorites";
      figure.append(img);
      article.append(h3, figure, btnReload, btnFavorite);
      cardRandomContainer.append(article);
      img.src = data[element].url;
      btnReload.onclick = () => reloadImages(0, element, 0);
      btnFavorite.onclick = () => saveFavouriteMichis(data[element].id);
    }
  } catch (error) {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
}

async function initialStatesFavorites() {
  try {
    const res = await fetch(`${apiEndpoints["favoritesImages"]}`, {
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
    });
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesFavorites: ${res}`
      );
    const data = await res.json();
    const cardFavoriteContainer = document.querySelector(".favoritesCards");
    cardFavoriteContainer.innerHTML = "";
    data.forEach((element) => {
      const article = document.createElement("article");
      const h3 = document.createElement("h3");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const btnErase = document.createElement("button");

      article.classList.add("card");
      h3.classList.add("cardTtitle");
      img.classList.add("cardImageFavorite");
      btnErase.classList.add("eraseFavorite");
      btnErase.innerText = "erase Favorite";

      img.src = element.image.url;

      btnErase.onclick = () => deleteFavourite(element.id);

      figure.append(img);
      article.append(h3, figure, btnErase);
      cardFavoriteContainer.appendChild(article);
    });
  } catch (error) {
    console.error(error.message);
    const spanErrorFavorite = document.getElementById("spanErrorFavorite");
    spanErrorFavorite.innerText = `Error: ${error.message}`;
  }
}

async function saveFavouriteMichis(id) {
  try {
    const res = await fetch(`${apiEndpoints["favoritesImages"]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    //const data = await res.json();
    alert("Imagen Guardada");
    initialStatesFavorites();
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesFavorites: ${res}`
      );
  } catch {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
}

async function reloadImages(Api = 0, identifier = 0, form = 0) {
  try {
    const res = await fetch(`${apiEndpoints["searchOneImages"]}`);
    const data = await res.json();
    const imagenes = document.getElementsByClassName("cardImage");
    imagenes[identifier].src = data[0].url;
    const btnFavorite = document.getElementsByClassName("saveFavorite");
    btnFavorite[identifier].onclick = () => saveFavouriteMichis(data[0].id);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteFavourite(id) {
  try {
    const res = await fetch(`${apiEndpoints["favoritesImages"]}${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": apiKey,
      },
    });
    alert("Imagen eliminada");
    const data = await res.json();
    initialStatesFavorites();
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesFavorites: ${res}`
      );
  } catch (error) {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
}

async function uploadPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);
  console.log(formData.get("file"));
  try {
    const res = await fetch(apiEndpoints["uploadImages"], {
      method: 'POST',
      headers: {
        "X-API-KEY": apiKey,
      },
      body: formData,
    })

    if (res.status !== 201)
      throw new Error(
        `Error de petición HTTP en upload: ${res}`
      );


    const data = await res.json();
    console.log("Foto de michi subida :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteMichis(data.id);

  } catch (error) {

    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);

  }
}

const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
}

/* async function initialStatesRandom() {
  try {
    const res = await fetch(`${apiEndpoints[0]}`);
    if (res.status !== 200)
      throw new Error(
        `Error de petición HTTP en initialStatesRandom: ${res.status}`
      );
    const data = await res.json();

    const imagenes = document.getElementsByClassName("cardImage");
    const botonReload = document.getElementsByClassName("reloadRandom");
    const botonSave = document.getElementsByClassName("saveFavorite");

    for (let element = 0; element < imagenes.length; element++) {
      imagenes[element].src = data[element].url;
      botonReload[element].onclick = () =>reloadImages(0,element,0);
      botonSave[element].onclick = () =>saveFavouriteMichis(data[element].id);
    }

  } catch (error) {
    const spanErrorRandom = document.getElementById("spanErrorRandom");
    spanErrorRandom.innerText = `${error.message}`;
    console.error(error.message);
  }
} */

//initialStatesRandom();
initialStatesRandom();
initialStatesFavorites();
