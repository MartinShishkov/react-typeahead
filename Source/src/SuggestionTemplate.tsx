import * as React from 'react';
import IMovie from './IMovie';

export interface ISuggestionTemplateProps{
    data: IMovie
}

export const SuggestionTemplate: React.FC<ISuggestionTemplateProps> = (props) => {
    return (
        <div style={{borderBottom: "1px solid gainsboro", paddingTop: "10px"}}>
            <table style={{width: "100%"}}>
                <tr>
                    <td style={{width: "5%"}}>
                        <img src={props.data.imageUrl} style={{width: "90px"}}/>
                    </td>
                    <td style={{width: "80%", verticalAlign: "top"}}>
                        <table>
                            <tr>
                                <td colSpan={2}>
                                    <h3 style={{margin: "0", fontFamily: "sans-serif", fontWeight: 300}}>
                                        {props.data.title}
                                    </h3>
                                    <p style={{color: "gray", fontStyle: "italic"}}>{props.data.description}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "50%"}}>Release date: <b>{props.data.releaseDate}</b></td>
                                <td>
                                    IMDB Rating: <b>{`${props.data.rating} / 10`}</b>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
};