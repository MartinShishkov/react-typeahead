import MockDB from "./MockMovieDb";
import IMovie from './IMovie';
import BaseDataProvider from './MoviesDataProvider.Base';

declare const Bloodhound: any;

export default class MoviesDataProviderLocal extends BaseDataProvider {
    private readonly data: IMovie[];

    constructor() {
        super();
        this.data = MockDB;
    }

    get DataSource(): Function {
        return () => {
            var engine = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace("title"),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                identify(obj) { return obj["title"]; },
                local: this.data
            });

            function suggestionsWithDefaults(q, sync) {
                if (q === "") {
                    sync(engine.index.all());
                }

                else {
                    engine.search(q, sync);
                }
            }

            return suggestionsWithDefaults;
        }
    }
}