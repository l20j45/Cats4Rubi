const API = "https://api.thecatapi.com/v1/images/search";

const petition = async (urlApi) => {
  const response = await (await fetch(urlApi)).json();
  return response;
};

async function reload(term = "", identifier = "") {
  try {
    const jsonresponse = await petition(`${API}`);
    const img = document.querySelector(`#cardImage${identifier}`);
    const title = document.querySelector(`#cardTitle${identifier}`);
    img.src = jsonresponse[0].url;
  } catch (error) {
    console.error(error.message);
  }
}

reload('',1);
reload('',2);
reload('',3);
reload('',4);