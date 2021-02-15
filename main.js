const url = 'https://pokeapi.co/api/v2/pokemon/';
const colors = ['#ec4646', '#23689b', '#007965', '#9708CC', '#6f9eaf', '#f37121', '#52057b', '#130CB7', '#949cdf', '#663f3f', '#3797a4', '#c060a1', '#335d2d'];

function randIn13() {
    return Math.round(Math.random() * 13)
}


function getPaginatedPage(btn) {
    const url = $(btn).data('url');
    getPokemons(url);
}

function getPokemonData(url) {

    fetch(url).then(response => response.json()).then(data => {
        Swal.fire({
            title: data.name,
            text: `
                Type(s): ${data.types.map(item => item.type.name).toString()},
                Height: ${data.height},
                Weight: ${data.weight}
            `,
            imageUrl: data.sprites.front_default,
            imageWidth: 200,
            imageHeight: 'auto',
            imageAlt: 'Custom image',
        })
    })
}


function getPokemons(url) {
    let pokemons = [];

    fetch(url).then(response => response.json()).then(data => {

        // purple braces means return and lightblue is object
        pokemons = data.results.map(pokemon => ({
            ...pokemon
        }))


        if (data.next) {
            $('#nextBtn').removeAttr('disabled');
            $('#nextBtn').css('opacity', '1');
            $('#nextBtn').data('url', data.next)
        } else {
            $('#nextBtn').data('url', null)
            $('#nextBtn').attr('disabled');
            $('#nextBtn').css('opacity', '0.7');
        }

        if (data.previous) {
            $('#prevBtn').removeAttr('disabled');
            $('#prevBtn').css('opacity', '1');
            $('#prevBtn').data('url', data.previous);
        } else {
            $('#prevBtn').data('url', null);
            $('#prevBtn').attr('disabled');
            $('#prevBtn').css('opacity', '0.7');
        }

        $('.pokemons').html('');

        pokemons.forEach(pokemon => {
            $('.pokemons').append(`
            <p style="color: ${colors[randIn13()]}" 
            onclick="getPokemonData('${pokemon.url}')">
                ${pokemon.name}
            </p>
        `)
        });
    })
}

getPokemons(url);












