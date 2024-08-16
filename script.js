
let statBtns = document.querySelectorAll('.tools-item');
const toolsMapping = {
    'Daily': 'last-Day',
    'Weekly':'last-Week',
    'Monthly':'last-Month'
}

let fetchedData = null

function fetchData(){
    fetch('data.json').then((request)=> {
        if (!request.ok){
            console.log('something went wrong')
            return null
        }
        return request.json()
        }).then((data) => {
            fetchedData = data
            console.log('data fecthed', fetchedData)
        })    
    }


function makeTimeItem(dataSet, category){
    let catLowerCase = category.toLowerCase()
    let mainParentEl = document.createElement('section')
    mainParentEl.setAttribute('aria-label', dataSet.title)
    mainParentEl.dataset.cat = dataSet.title
    mainParentEl.classList.add('card', 'activity-card', `${dataSet.title.toLowerCase().replace(' ', '')}`)
    mainParentEl.innerHTML = ` 
                <div class="card activity-card-inner">
                    <div class="activity-card-title">
                        <p class="small-txt txt-white">${dataSet.title}</p>
                    </div>
                    <div class="activity-card-stats-container">
                        <p class="activity-card-stats-current txt-white">${dataSet.timeframes[catLowerCase].current}hrs</p>
                        <small class="activity-card-stats-previous">${toolsMapping[category]} - ${dataSet.timeframes[catLowerCase].previous}hrs</small>
                    </div>
                </div>`
    return mainParentEl

}


function updateUI(category) {
    let wraper = document.querySelector('.wraper');
    Array.from(wraper.children).forEach(el => {
        if (el.getAttribute('aria-label') !== 'users card') {
            wraper.removeChild(el)
        }
    })

    fetchedData.forEach(cat => wraper.appendChild(makeTimeItem(cat, category)))
}


fetchData()
updateUI('Weekly')

if (fetchedData){
    
}else {
    console.log('data not uploaded')
}

statBtns.forEach(btn => btn.addEventListener('click', ()=> {
    let category = btn.dataset.name
    if (fetchedData){
        updateUI(category)
    }else {
        console.log('data not uploaded')
    }
    
}))