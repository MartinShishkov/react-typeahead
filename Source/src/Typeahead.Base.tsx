import * as React from "react";
import { ITypeaheadProps } from "./Interfaces.Typeahead";

declare const $: any;

export interface TypeaheadBaseProps {
    name: string,
    text: string,
    dialogTitle?: string,
    placeholder?: string,
    className?: string,
    style?: object,
    typeahead: ITypeaheadProps,
    onChange: Function
}

export default class TypeaheadBase extends React.PureComponent<TypeaheadBaseProps>{
    private readonly TYPEAHEAD_ASYNC_REQUEST_EVENT: string = "typeahead:asyncrequest";
    private readonly TYPEAHEAD_ASYNC_CANCEL_EVENT: string = "typeahead:asynccancel";
    private readonly TYPEAHEAD_ASYNC_RECEIVE_EVENT: string = "typeahead:asyncreceive";
    private readonly TYPEAHEAD_SELECT_EVENT: string = "typeahead:select";

    private typeaheadInputRef: HTMLInputElement;

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.typeaheadInputRef.value = this.props.text || "";
    }

    componentDidUpdate(prevProps, prevState, prevContext): void {
        this.typeaheadInputRef.value = this.props.text || "";
    }

    private readonly init = (typeaheadInputRef: HTMLInputElement): void => {
        this.typeaheadInputRef = typeaheadInputRef;

        const limit = this.props.typeahead.dataset.limit || 100;
        const minLength = this.props.typeahead.minLength;

        $(this.typeaheadInputRef).typeahead({
            classNames: this.props.typeahead.classNames,
            minLength: minLength,
            highlight: this.props.typeahead.highlight
        }, {
                display: this.props.typeahead.dataset.display,
                source: this.props.typeahead.dataset.source(),
                templates: {
                    suggestion: (arg) => {
                        return this.props.typeahead.dataset.templates.suggestion(arg);
                    }
                },
                limit: limit
            }).on(this.TYPEAHEAD_ASYNC_REQUEST_EVENT, () => {
                $(this.typeaheadInputRef).parent(".twitter-typeahead").addClass("twitter-typeahead-loading");
            }).on(`${this.TYPEAHEAD_ASYNC_CANCEL_EVENT} ${this.TYPEAHEAD_ASYNC_RECEIVE_EVENT}`, () => {
                $(this.typeaheadInputRef).parent(".twitter-typeahead").removeClass("twitter-typeahead-loading");
            });

        $(this.typeaheadInputRef).bind(this.TYPEAHEAD_SELECT_EVENT, (ev, suggestion) => {
            this.handleChange(ev, suggestion);
        });
    }

    private readonly handleChange = (ev, suggestion) => {
        const target = {
            name: this.props.name,
            value: suggestion
        };

        this.props.onChange({ target });
    }

    render() {
        return (
            <input type="text" name={this.props.name} id={this.props.name}
                placeholder={this.props.placeholder || ""}
                className={this.props.className}
                style={this.props.style}
                ref={this.init}
            />
        );
    }
}