import data from './data/data.json' assert{type: "json"};
/**
 * @param {Element} parent
 * @returns {Element} pal list
 */
const createPalList = (parent) => {
    const targetInput = parent.children[0].childNodes.item(3);
    const listWrapper = document.createElement(`div`);
    listWrapper.className = `listWrapper`;
    listWrapper.id = `${parent.className}_list`;

    const resetElement = document.createElement(`div`);
    resetElement.setAttribute(`no`, `000`);
    resetElement.setAttribute(`name`, `초기화`);
    resetElement.innerText = `초기화`;
    resetElement.className = 'pal';
    resetElement.addEventListener(`click`, function(e) {
        targetInput.value = '';
        listWrapper.parentElement.classList.replace('appear', 'hidden');
    })
    listWrapper.appendChild(resetElement);

    data.forEach(palDatum => {
        const pal = document.createElement(`div`);
        pal.setAttribute('no', palDatum.no);
        pal.setAttribute('name', palDatum.name);
        pal.className = `pal`;
        pal.innerText = `No.${palDatum.no} ${palDatum.name}`;
        listWrapper.appendChild(pal);
        pal.addEventListener(`click`, function(e){
            targetInput.value = `No.${palDatum.no} ${palDatum.name}`;
            listWrapper.parentElement.classList.replace('appear', 'hidden');
        });
    });

    return listWrapper;
}

function init(){
    const base = document.querySelector('#base');
    const target = document.querySelector('#target');

    const listContainers = [...document.querySelectorAll('.pal_list')];
    listContainers.forEach((container) => {
        const palList = createPalList(container.parentElement);
        container.appendChild(palList);
    });

    const range = document.querySelector('#depth');
    const rangeText = document.querySelector('#depth_text')
    range.addEventListener('input', function(e){
        rangeText.innerText = e.target.value;
    });

    base.addEventListener(`click`, function(e){
        e.target.parentElement.parentElement.lastElementChild.classList.replace('hidden', 'appear');
    });

    base.addEventListener('search', function(e){
        e.target.parentElement.parentElement.lastElementChild.classList.replace('appear', 'hidden');
    })

    target.addEventListener(`click`, function(e){
        e.target.parentElement.parentElement.lastElementChild.classList.replace('hidden', 'appear');
    })

    target.addEventListener('search', function(e){
        e.target.parentElement.parentElement.lastElementChild.classList.replace('appear', 'hidden');
    })
    
    document.addEventListener('click', function(e){
        if ( base.parentElement.parentElement.lastElementChild.classList.contains('appear') && e.target !== base ) {
            base.parentElement.parentElement.lastElementChild.classList.replace('appear', 'hidden');
        }
        if ( target.parentElement.parentElement.lastElementChild.classList.contains('appear') && e.target !== target ) {
            target.parentElement.parentElement.lastElementChild.classList.replace('appear', 'hidden');
        }   
    })
}

init();