import * as React from 'react'
import TypeaheadMovieSuggestions from './Typeahead.MovieSuggestions';
import { MockDB } from './MockMovieDb';
import MoviesDataProviderLocal from './MoviesDataProvider.Local';
import MoviesDataProviderRemote from './MoviesDataProvider.Remote';

interface IMockFormState {
    selectedMovie: string
}

export default class MockForm extends React.Component<{}, IMockFormState> {
    constructor(props){
        super(props);

        this.state = {
            selectedMovie: ""
        };
    }

    private readonly handleValueChange = ({target}): void => {
        this.setState({
            selectedMovie: target.value.title
        })
        console.log(target);
    };

    private readonly handleOnSubmitClick = (): void => {
        alert(`You've selected ${this.state.selectedMovie}`);
    };

    private readonly movieTitlesUi = (): JSX.Element => {
        const movies = MockDB;

        return (
            <pre>
                {JSON.stringify(movies.map((m) => m.title), null, 4)}
            </pre>
        )
    };

    render = () => {
        return (
            <form style={{width: "800px"}}>
                {this.movieTitlesUi()}

                <fieldset style={{marginBottom: "50px"}}>
                    <legend>Local data source</legend>
                    <label htmlFor="selectedMovieLocal">Movie name:</label>
                    <TypeaheadMovieSuggestions
                        name={"selectedMovieLocal"}
                        text={this.state.selectedMovie}
                        onChange={this.handleValueChange}
                        dataProvider={new MoviesDataProviderLocal()}
                    />
                </fieldset>


                <fieldset style={{marginBottom: "50px"}}>
                    <legend>Remote data source</legend>
                    <label htmlFor="selectedMovieRemote">Movie name:</label>
                    <TypeaheadMovieSuggestions
                        name={"selectedMovieRemote"}
                        text={this.state.selectedMovie}
                        onChange={this.handleValueChange}
                        dataProvider={new MoviesDataProviderRemote()}
                    />
                </fieldset>

                <input 
                    type="button" 
                    value="Mock Submit" 
                    disabled={this.state.selectedMovie === ""}
                    onClick={this.handleOnSubmitClick}
                />
            </form>
        )
    }
}