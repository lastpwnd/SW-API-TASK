async function letsFetch (content) {
    try {
        let res = await fetch(`https://www.swapi.tech/api/${content}`)
        let data = await res.json()
        showRes(data, content) 
    }
    catch (error) { 
        window.alert("Please be more accurate while clicking ;)")  
        location.reload()    
    }
 }

 //fetch function, called after clicking one of the nav links
 async function navFetch (link) {
    try {
        let res = await fetch(link)
        let data = await res.json()
        let url = new URL(data.previous || data.next)
        let path = url.pathname.split('/')
        let content = path[path.length - 1]
        showRes(data, content)      
    }    
    catch (error) {
        window.alert("Please be more accurate while clicking ;)") 
        location.reload()
    }
 }

//most data contains link with all properties, that requires extra fetching
async function deepFetch(content, id) { 
    let res = await fetch(`https://www.swapi.tech/api/${content}/${id}`)
    let data = await res.json()
    showInnerData(data, content, id)
}

let myResults = document.querySelector('#results')


//two functions that fill the content of each card
function insertData (result, paramsArray) {
    for (let i = 0; i < paramsArray.length; i++)
    {
        result.innerHTML += paramsArray[i]
    }
}

function showInnerData(data, content, id) {

   let props = data.result.properties
   let result = document.getElementById(id)
   let paramsArray = []

    switch (content) {       
        case "people":
        paramsArray = [`DoB: ${props.birth_year} <br>`,`Gender: ${props.gender} <br>`,`Height: ${props.height} cm<br>`,`Hair Color: ${props.hair_color} <br>`]
        break 
        case "planets":
        paramsArray = [`Population: ${props.population} <br>`, `Terrain: ${props.terrain} <br>`, `Climate: ${props.climate} <br>`, `Diameter: ${props.diameter} km<br>`]   
        break   
        case "species":
        paramsArray = [`Average Lifespan (years): ${props.average_lifespan} <br>`, `Classification: ${props.classification} <br>`, `Designation: ${props.designation} <br>`, `Language: ${props.language} <br>`]
        break  
        case "starships":
        paramsArray = [`Model: ${props.model} <br>`,`Length: ${props.length} m <br>`,`Passengers: ${props.passengers} <br>`,`Cost (credits): ${props.cost_in_credits} <br>`]
        break
        case "vehicles":
        paramsArray = [`Model: ${props.model} <br>`, `Manufacturer: ${props.manufacturer} <br>`, `Crew: ${props.crew} <br>`, `Length: ${props.length} m <br>`, `Passengers: ${props.passengers} <br>`, `Cost (credits): ${props.cost_in_credits} <br>`]
    }
    insertData(result, paramsArray)
}

//main function, displaying the results
function showRes(data, content) {

    if (content === "films")
    {
            myResults.innerHTML = data.result.map((e) => {
                let label = e.properties.title
                let id = e.uid
                return `<div id="${id}" class="films"><h3>${label}</h3>
                Release Date: ${e.properties.release_date} <br>
                Directed by: ${e.properties.director} <br>
                Produced by: ${e.properties.producer} <br><br>         
                ${e.properties.opening_crawl}</div>`
            }) 
        }
    else
    {      
        myResults.innerHTML = data.results.map((e) => {        
                let label = e.name
                deepFetch(content, e.uid)  
                return `<div id="${e.uid}" class="result"><h3>${label}<h3>
                </div>`          
        })
    }

//conditions for the nav links to appear     
        if (data.previous) {
            let link = document.querySelector("#prevLink")
            link.style.display = "flex"
            link.href = new URL(data.previous)
        }
        else if (!data.previous) {
            let link = document.querySelector("#prevLink")
            link.style.display = "none"
        }
        
        if (data.next) {
            let link = document.querySelector("#nextLink")
            link.style.display = "flex"
            link.href = new URL(data.next)
        }
        else if (!data.next) {
            let link = document.querySelector("#nextLink")
            link.style.display = "none"
        }
//waiting for the data and immediately removing overlay leaves a vulnerability for user to spam requests, recieving errors
//that is the reason why solid timeout been implemented
        setTimeout(e => {
            document.querySelector('.overlay').classList.remove('active')
        }, 4000)             
}


//group of listeners (for buttons in the header and nav links in the footer)
document.querySelector('#buttons').addEventListener('click', e => {
    document.querySelector('.overlay').classList.add('active')
    window.scrollTo(0,0)
    letsFetch(e.target.textContent.trim().toLowerCase()) 
})

document.querySelector('#footer').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.overlay').classList.add('active')
    window.scrollTo(0,0)
    navFetch(e.target.href) 
})


