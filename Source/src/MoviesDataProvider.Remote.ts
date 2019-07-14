import BaseDataProvider from './MoviesDataProvider.Base';

declare const Bloodhound: any;

export default class MoviesDataProviderRemote extends BaseDataProvider{

    get DataSource(): Function {
        return () => {
            
            // this is a mock endpoint url;
            // generally you'd want your endpoint to accept
            // a some get param in order to return relevant results;
            // right now it would always return all of the items
            const url = `https://raw.githubusercontent.com/MartinShishkov/react-typeahead/master/movies-remote.json`;

            const engine = new Bloodhound({
                remote: {
                    url: url + "?q=%QUERY", //%QUERY here is what the user has entered
                    wildcard: '%QUERY'
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                datumTokenizer: (datum) => {
                    return Bloodhound.tokenizers.whitespace(datum["title"]);
                },
                transform: (responseData) => {
                    return responseData;
                }
            });

            return engine;
        };
    }
}