
// function to fetch data from API 
const fetchData = async(url, {body, ...rest})=>{
    const config={
        ...rest,
        headers:{"Content-type": "application/json; charset=UTF-8"}
    }
    if(body){config.body = JSON.stringify(body)}
    try{
        let response = await fetch(url, config);
        let data = await response.json();
        if(data)return data
        else new Error("data not found");

    }catch(e){
        console.log(e)
    }
}
export default fetchData;