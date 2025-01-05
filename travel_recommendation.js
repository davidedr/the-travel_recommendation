const contentsDiv = document.getElementById("contentsDiv");

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener('click', e => {
    search.textContent = "";
    contentsDiv.innerHTML = '';
})

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', e => {
    const searchIntput = document.getElementById("searchIntput");
    let text = searchIntput.value;
    if (!text) {
        alert("Write something in the search box!");
        searchIntput.focus();
        return;
    }
    text = text.toLowerCase();
    const splitted = text.split(' ');
    if (splitted.length < 2) {
        alert("Type at least two words!")
        searchIntput.focus();
        return;
    }

    const baseUrl = "https://my-json-server.typicode.com/davidedr/the-travel_recommendation";
    let url = null;
    switch (splitted[0]) {
        case 'country':
        case 'countries':
            url = `${baseUrl}/countries`;
            break;

        case 'temple':
        case 'temples':
            url = `${baseUrl}/temples`;
            break;

        case 'beach':
        case 'beaches':
            url = `${baseUrl}/beaches`;
            break;

        default:
            alert("First term must be country or countries, temple or temples, beach or beaches!");
            searchIntput.focus();
            return;
    }

    fetch('https://my-json-server.typicode.com/davidedr/the-travel_recommendation/db', { method: 'GET'})
        .then(r => {
            console.log(r);
            return r.json();
        })
        .then(d => {
            debugger;
            const filtered = d.filter(e => e.name.toLowerCase().includes(splitted[1].toLowerCase()));
            if (!filtered) {
                alert("Sorry, no match for your query!");
                searchIntput.focus();
                return;
            }

            filtered.forEach((e, i) => {
                const p = document.createElement('div');
                p.innerHTML = `<h1>${e.cities.name}</h1><p>${e.cities.name}</p>`;
                contentsDiv.appendChild(p);
            });
        })
        .catch(e => {
            alert(`Error: ${e}`);
            searchIntput.focus();
            return;
        });

    return;

});


