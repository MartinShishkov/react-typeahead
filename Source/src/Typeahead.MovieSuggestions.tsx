import * as React from 'react';
import { renderToString } from 'react-dom/server';
import TypeaheadBase from './Typeahead.Base';
import { SuggestionTemplate } from './SuggestionTemplate';
import BaseDataProvider from './MoviesDataProvider.Base';

export interface ITypeaheadMovieSuggestionsProps {
    name: string,
    text: string,
    onChange: Function,
    dataProvider: BaseDataProvider
}

export default class TypeaheadMovieSuggestions extends React.Component<ITypeaheadMovieSuggestionsProps, {}> {
    constructor(props){
        super(props);
    }

    render = () => {
        return (
            <TypeaheadBase
                    name={this.props.name}
                    text={this.props.text}
                    onChange={this.props.onChange}
                    typeahead={{
                        minLength: 3,
                        highlight: true,
                        searchField: "title",
                        classNames: {
                            menu: `tt-menu`
                        },
                        dataset: {
                            source: this.props.dataProvider.DataSource,
                            display: (arg) => {
                                return arg.title;
                            },
                            templates: {
                                suggestion: (arg) => {
                                    const html = renderToString(
                                        <SuggestionTemplate data={arg}/>
                                    );
            
                                    return html;
                                }
                            },
                            limit: 100
                        }
                    }}
                />
        );
    }
}