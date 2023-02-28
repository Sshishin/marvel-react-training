

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=bd5afe896d3938eaf9720dae3807fba6')
        return res.data.results.map(this._transformerCharacters);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=bd5afe896d3938eaf9720dae3807fba6`)
        return this._transformerCharacters(res.data.results[0]);
    }

    _transformerCharacters = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService