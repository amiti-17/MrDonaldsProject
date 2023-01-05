import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";

export function useDB() {

    const dbRef = ref(getDatabase());
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);    

    useEffect(()=>{
        get(child(dbRef, 'goods')).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log('snapshot?',snapshot.val());
                setResponse(snapshot.val())
            } else {
                setError(new Error('We receive empty data'))
                console.error("No data available");
            }
            }).catch((e) => {
                setError(e);
                console.error(e);
            });
    },[dbRef])

    return {response, error};
}