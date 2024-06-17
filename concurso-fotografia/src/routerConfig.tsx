import {Home, Gallery, Contact} from './components/pages'

export const routes = [
     {
        path : '/',
        element: <Home/>
     },
     {
        path : '/galeria',
        element: <Gallery/>
     },
     {
        path : '/contacto',
        element: <Contact/>
     },
]