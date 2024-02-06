import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './componets/LocationCard';
import ResidentCard from './componets/ResidentCard';
import Pagination from './componets/Pagination';
import banner from './assets/banner.webp';

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPag, setCurrentPag] = useState(1);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  }, [finder]);

  // console.log(location);

  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }

  const quantity = 5;
  const second = currentPag * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPag = location && Math.floor(location.residents.length / quantity) + 1;

  return (
    <div className='app'>
      <header className='app-header'>
        <img src={banner} alt="banner" />
      </header>

      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <>
            <h1>Rick and Morty</h1>
            <form
              onSubmit={handleSubmit}
              className='app__form'
            >
              <input
                className='app__text'
                type="number"
                ref={textInput}
                placeholder='type a numbre (1 to 126)'
              />
              <button className='app__btn'>Search</button>
            </form>
            {
              hasError || finder === '0' ?
                <h2>This location do not exist</h2>
                :
                <>
                  <LocationCard
                    location={location}
                  />
                  <Pagination
                    currentPag={currentPag}
                    setCurrentPag={setCurrentPag}
                    totalPag={totalPag}
                  />
                  <div className='app__container'>
                    {
                      residentsPart.map(resident => (
                        <ResidentCard
                          key={resident}
                          url={resident}
                        />
                      ))
                    }
                  </div>
                  <Pagination
                    currentPag={currentPag}
                    setCurrentPag={setCurrentPag}
                    totalPag={totalPag}
                  />
                </>
            }

          </>
      }
    </div>
  )
}

export default App;
