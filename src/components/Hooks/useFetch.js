import { useEffect, useState } from "react";

export function useFetch() {
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const json = await fetch('DB.json');
                const res = await json.json();
                setResponse(res);
            } catch (err) {
                console.log('err: ', err);
                setError(err);
            }
        })()
    }, [])

    return { response, error }
}