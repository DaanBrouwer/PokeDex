import { Ribbon } from './components/Ribbon/Ribbon';
import { FlashMessageViewChannel } from './components/FlashMessages/FlashMessageViewChannel';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PokemonApp } from './PokemonApp/PokemonApp';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { About } from '../About/About';
import { NavLink } from './components/NavLink/NavLink';
import { Suspense } from 'react';
import { Spinner } from '../components';
import { WeatherStationList } from './PokemonApp/components/WeatherStationList/WeatherStationList';
import { WeatherDetail } from './PokemonApp/components/WeatherDetailList/WeatherDetail';
export function App() {
  const menu = [
    <NavLink key="pokemon" to="/pokemon">
      Pokemon
    </NavLink>,
    <NavLink key="about" to="/about">
      About
    </NavLink>,
    <NavLink key="weather" to="/weather">
      Weather
    </NavLink>
  ];

  return (
    <>
      <FlashMessageViewChannel />

      <div className="flex flex-col h-screen bg-gray-50">
        <nav className="flex lg:justify-center items-center py-5 bg-red-600 text-4xl">
          <MobileMenu>{menu}</MobileMenu>
          <div className="hidden lg:flex gap-2">{menu}</div>
        </nav>

        <Ribbon />

        <div className="flex-grow bg-gray-50 flex justify-center">
          <div className="w-full lg:w-1024 mt-10 mb-4 mx-1">
            <Suspense fallback={<Spinner></Spinner>}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={'/pokemon'}></Navigate>}
                ></Route>
                <Route
                  path="/pokemon/*"
                  element={<PokemonApp></PokemonApp>}
                ></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="*" element="404"></Route>
                <Route
                  path="weather/:id"
                  element={<WeatherDetail></WeatherDetail>}
                ></Route>
                <Route
                  path="weather"
                  element={<WeatherStationList></WeatherStationList>}
                ></Route>
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
