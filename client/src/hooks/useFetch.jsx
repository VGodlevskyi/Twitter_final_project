import { useCallback, useEffect, useState } from "react";
import qs from "qs";
import api from "../services/API";
import { catchError } from "../utils";

export const useFetch = ({
    instant = true,
    initData = null,
    onCompleted = ( data ) => data,
    dataTransformer = ( data ) => data,
    onError = catchError,
    dependencies = [],
    ...axios
 }) => {
    const [ data, setData ] = useState( initData );
    const [ loading, setLoading ] = useState( false );

    const fetcher = useCallback(
        ( options ) => {
            const fetchOptions = { ...axios, ...options };
            if (fetchOptions.paramsStringify) {
                fetchOptions.url = `${fetchOptions.url}?${qs.stringify(
                    fetchOptions.paramsStringify
                )}`;
            }

            setLoading( true );

            return api( fetchOptions )
                .then( dataTransformer )
                .then( ( res ) => {
                    setData( res );
                    onCompleted( res, options );
                    return res;
                } )
                .catch( onError )
                .finally( () => {
                    setLoading( false );
                } );
        },
        // eslint-disable-next-line
        [ onCompleted, dataTransformer, ...dependencies ]
    );

    useEffect( () => {
        if (instant) {
            fetcher( axios );
        }
        // eslint-disable-next-line
    }, [...dependencies] );


    return [
        {
            data,
            loading,
            modifyData: setData,
        },
        fetcher
    ];
};
