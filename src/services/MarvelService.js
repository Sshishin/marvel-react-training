

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=bd5afe896d3938eaf9720dae3807fba6')
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=bd5afe896d3938eaf9720dae3807fba6`)
        return this._transformerCharacters(res)
    }

    _transformerCharacters = (res) => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url
        }
    }
}

export default MarvelService