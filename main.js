
const obtener = document.querySelector('#obtener');
const enviar = document.querySelector('#enviar');
const descargar = document.querySelector('#descargar');
const imageContainer = document.querySelector('#image');



const URL_API_JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com/posts';
const URL_API_VIA_PLACEHOLDER = 'https://via.placeholder.com/150';
//el cors_anywhere es para solucionar el error que da.
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

const getFromApi = () => {

    fetch(URL_API_JSON_PLACEHOLDER,
        {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((post) => console.log(post.slice(0, 3)))
        .catch((error) => console.error(error))

}

obtener.addEventListener('click', () => {
    getFromApi();
})


const imgRender = (url) => `
    <img src=${url}>
`;

const downloadImageFromApi = () => {
    fetch(CORS_ANYWHERE + URL_API_VIA_PLACEHOLDER,
        {
            method: 'GET'
        })
        .then((response) => response.blob())
        .then((image) => {
            const objectUrl = URL.createObjectURL(image);
            imageContainer.innerHTML = imgRender(objectUrl)

        })
        .catch((error) => console.error(error))
}


const postToApi = (newPost) => {
    fetch(URL_API_JSON_PLACEHOLDER,
        {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((post) => console.log(post))
        .catch((error) => console.error(error))
}

enviar.addEventListener('click', () => {
    const newPost = {
        title: 'EJEMPLO DE POST',
        body: 'Este es un ejemplo del metodo post'
    }
    postToApi(newPost);
})


descargar.addEventListener('click', () => {
    downloadImageFromApi();
})