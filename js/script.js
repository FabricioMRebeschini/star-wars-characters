//URL da API
let currentPageUrl = 'https://swapi.dev/api/people/'

//toda vez que a pag. carregar vai executar essa funcao
window.onload = async () =>{ // async (espera receber algo)
    try{  // se for bem sucessida try = tente
        await loadCharacters(currentPageUrl); //executa funcao
    } catch (error){  // se não
        console.log(error); // mostra erro
        alert('Erro ao carregar cards'); //feedback
    };

    const nextButton = document.querySelector('#next-button')
    const backButton = document.querySelector('#back-button')

    nextButton.addEventListener('click', loadNextPage)

    backButton.addEventListener('click', loadPreviousPage)
}

async function loadCharacters(url){
    const mainContent = document.querySelector('#main-content')
    mainContent.innerHTML = '' //limpa os resultados anteriores para nao incremetar e sim aparecer de 10 em 10

    try{// await (aguarde essa requisição)
        const response = await fetch(url); //fetch faz uma requisição(utiliza) para url da API
        // converte em formato JSON para poder utilizar(iterar)
        const responseJson = await response.json();

        //iterando com cada objeto do array 
        //para cadda iteração gera um personagem
        responseJson.results.forEach((character) => {
            const card = document.createElement('div')
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` //uso de regExp expressão regular(estudar mais a fundo)
            card.className = 'cards'

            //criou os elementos 
            const characterNameBG = document.createElement('div')
            characterNameBG.className = 'character-name-bg'

            const characterName = document.createElement('span')
            characterName.className = 'character-name'
            characterName.innerText = `${character.name}`

            //organizou as tags na ordem certa
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () =>{
                const modal = document.querySelector('#modal')
                modal.style.visibility = 'visible'

                const modalContent = document.querySelector('#modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement('span')
                characterHeight.className = 'character-details'
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement('span')
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement('span')
                eyeColor.className = 'character-details'
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const hairColor = document.createElement('span')
                hairColor.className = 'character-details'
                hairColor.innerText = `Cor do cabelo: ${convertHair(character.hair_color)}`

                const birthYear = document.createElement('span')
                birthYear.className = 'character-details'
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
                modalContent.appendChild(hairColor)
            }

            mainContent.appendChild(card)
        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')
        //se nao tiver responseJson.next desabilita
        nextButton.disabled = !responseJson.next
        //se nao tiver responseJson.previoous desabilita
        backButton.disabled = !responseJson.previous
        //se tiver response.json previous torna visivel, else invisível
        backButton.style.visibility = responseJson.previous?'visible': 'hidden'

        
        currentPageUrl = url

    } catch(error){
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

//funcao de botao proximo
async function loadNextPage(){
    if(!currentPageUrl) return

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        console.log("Próxima página URL:", responseJson.next);
        await loadCharacters(responseJson.next)

    } catch(error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}
//funcao de botao anterior
async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        await loadCharacters(responseJson.previous)

    } catch(error){
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal(){
    const modal = document.querySelector('#modal')
    modal.style.visibility = 'hidden'
}
// criou um funcao com um objeto que contem todas as cores q chega na API essa funcao recebe a cor e atribui o valor
function convertEyeColor(eyeColor){
    const cores = {
        blue:'azul',
        brown:'castanho',
        green:'verde',
        yellow:'amarelo',
        black:'preto',
        pink:'rosa',
        red:'vermelho',
        orange:'laranja',
        hazel:'avela',
        unknown:'desconhecida'
    };
    //recebe o valor da API e compara
    //se tiver retorna o valor na chave 
    //se nao retorna o original
    return cores[eyeColor.toLowerCase()] || eyeColor;
}
// converte a altura 
function convertHeight(height){
    if(height === 'unknown'){
        return 'desconhecida'
    }
    //converte para numeros quebrados com 2 casas decimais
    return (height / 100).toFixed(2)
}

function convertMass(mass){
    if(mass === 'unknown'){
        return 'desconhecido'
    }

    return `${mass} kg`
}

function convertHair(hairColor){
    const cores = {
        blue:'azul',
        grey:'cinza',
        white: 'branco',
        brown:'castanho',
        green:'verde',
        yellow:'amarelo',
        black:'preto',
        pink:'rosa',
        red:'vermelho',
        orange:'laranja',
        hazel:'avela',
        'n/a':'n/a',
        none:'desconhecida',
        blond:'loiro',
        auburn:'ruivo(a)',
        'auburn, white': 'branco ruivo',
        'auburn, grey': 'cinza avermelhado'
    }

    return cores[hairColor.toLowerCase()] || hairColor;
}

function convertBirthYear(birthYear){
    if(birthYear === 'unknown'){
        return 'desconhecido'
    }

    return birthYear
}

const soundhover = document.querySelector('.logo-text')
soundhover.addEventListener('mouseover',()=>{
    const audio = document.querySelector('audio')
    audio.currentTime = 0
    audio.play()
})