import { async } from "@firebase/util";
import { useEffect, useState } from "react";

// export const useFetch = () => {
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(()=>{
//         fetch("DB.json")
//             .then(res => res.json())
//             .then(
//             (result) => {
//                 console.log('reu',result)
//                 // setIsLoaded(true);
//                 return setResponse(result);
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//                 // setIsLoaded(true);
//                 console.log(error)
//                 setError(error);
//             }
//         )
          


//         // fetch('DB.json')
//         // .then(res => res.json())
//         // .then(
//         //   (result) => {
//         //     setResponse(result);
//         //   },
//         //   (error) => {
//         //     setError(error);
//         //   }
//         // )

//         // try {
//         //     async function fetchData() {
//         //         console.log('1: ')
//         //         const json = await fetch('DB.json');
//         //         console.log('2: ', json)
//         //         const res = await json.json();
//         //         console.log('3: ', res)
//         //         setResponse(res);
//         //     }
//         //     fetchData();
//         // } catch(err) {
//         //     console.log('errorFetch: ', err)
//         //     setError(err)
//         // }
//     }, [])
//     return {response, error}
// }


    //   fetch("DB.json")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setIsLoaded(true);
    //         setItems(result);
    //       },
    //       // Note: it's important to handle errors here
    //       // instead of a catch() block so that we don't swallow
    //       // exceptions from actual bugs in components.
    //       (error) => {
    //         setIsLoaded(true);
    //         setError(error);
    //       }
    //     )
    // }, [])




export function useFetch() {
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async() => {
            try {
                const json = await fetch('DB.json');
                const res = await json.json();
                setResponse(res);
            } catch(err) {
                console.log('err: ',err);
                setError(err);
            }
        })()
    }, [])




    // единственно  рабочий код) ниже...

    // const jsno = '{"burger":[{"name":"JS Burger","img":"/menu/js-burger.png","id":1,"price":250,"toppings":["Бекон","Кетчуп","Сыр Чеддер","Красный лук","Огурцы","Помидор","Халапеньо"]},{"name":"Borsh Burger","img":"/menu/borsh-burger.png","id":2,"price":499.9,"toppings":["Бекон","Красный лук","Свекла","Кимчи","Халапеньо"]},{"name":"Freckles Burger","img":"/menu/freckles-burger.png","id":3,"price":350,"toppings":["Ананас","Майонец","Кетчуп","Кетчунез","Оливки","Картофель фри","Морковь"]},{"name":"Timon Burger","img":"/menu/black-burger.png","id":4,"price":150,"toppings":["Болгарский перец","Тату на булке"]},{"name":"React Burger","img":"/menu/react-burger.png","id":5,"price":299.9,"toppings":["Кетчуп","Сыр Чеддер","Красный лук","Огурцы","Халапеньо"]},{"name":"Sun Burger","img":"/menu/sun-burger.png","id":6,"price":200,"toppings":["Сыр Чеддер","Красный лук","Огурцы","Помидор","Халапеньо"]}],"other":[{"name":"Coka","img":"/menu/soda.png","id":1,"price":50,"choices":["Coca-cola","Fanta","Mirinda","Sprite"]},{"name":"Чайкофф","img":"/menu/tea.png","id":2,"price":70,"choices":["Черный","Улун","Зеленый","Пуэр"]},{"name":"Лукошко Фри","img":"/menu/french-fries.png","id":3,"price":75,"choices":["Классика","Дольки","В мундире"]},{"name":"Нагиевцы","img":"/menu/nuggets.png","id":4,"price":100,"choices":["Филе","Окорочка","Крылья"]},{"name":"Кофе","img":"/menu/coffee.png","id":5,"price":150,"choices":["Эспрессо","Доппио","Ристретто","Американо","Лунго","Макиато","Латте","Гляссе","Капучино","Раф"]},{"name":"Гринч","img":"/menu/green-coffee.png","id":6,"price":175.25}]}';
    // useEffect(() => {
    //     try {
    //         var temple = JSON.parse(jsno)
    //         setResponse(temple);
    //     } catch(err) {
    //         console.log(err)
    //         setError(err)
    //     }
    // },[])


    return {response, error}
}