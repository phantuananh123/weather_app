import React, { useEffect, useState } from 'react'

const api ={
    key:"044ca75faa135f595cb237142c293253",
    base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
    const [searchInput, setSearchInput] = useState("")
    const [searchCity, setSearchCity] = useState("")
    const [weatherInfor, setWeatherInfor] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const handlerSubmit =(e)=>{
        e.preventDefault();
        setSearchCity(searchInput);
    };
    useEffect(() => {
        const fetchWeatherData = async () =>    {
            if(!searchCity)return;
            setLoading(true)
            // Process
            try {
                const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
                const response =  await fetch(url);
                const data = await response.json();
                if(response.ok){
                    setWeatherInfor(`${data.name},${data.sys.country} ${data.weather[0].description},${data.main.temp}`)
                    setErrorMessage("")
                }else{
                    setErrorMessage(data.message)
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchWeatherData();
    }, [searchCity])
    
  return (
    <>
    <form onSubmit={handlerSubmit}>
        <input type='text' placeholder='City'value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
        <button>Search</button>
    </form>
    {loading ? (<div>Loading...</div>) : (<>{errorMessage ? (<div style={{color:"red"}}>{errorMessage}</div>) : (<div>{weatherInfor}</div>)} </>)}
    </>
  )
}

export default App
