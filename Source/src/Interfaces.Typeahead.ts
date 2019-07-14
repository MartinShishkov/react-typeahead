export interface ITemplatesProps {
    suggestion: Function
}

export interface IClassNamesProps {
    input?: string,
    menu?: string,
    hint?: string,
    dataset?: string,
    suggestion?: string,
    empty?: string,
    open?: string,
    cursor?: string,
    highlight?: string;
}

export interface IDataSetProps {
    source: Function,
    display: Function,
    templates: ITemplatesProps,
    limit?: number;
}

export interface ITypeaheadProps {
    placeholder?: string,
    highlight?: boolean,
    hint?: boolean,
    minLength?: number,
    classNames?: IClassNamesProps,
    searchField: string,
    dataset: IDataSetProps;
}