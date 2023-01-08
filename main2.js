const loadRandomCats = async () => {
    try {
        const response = await fetch(URL_RANDOM);
        const status = response.status;
        if (status !== 200) throw new Error(`Error de petición HTTP en Random: ${status}`);
        const data = await response.json();
	...
    } catch (error) {
        console.log(error.message);
        const errorNode = document.querySelector('#error');
        errorNode.innerText = `Error: ${error.message}`;
    }
}