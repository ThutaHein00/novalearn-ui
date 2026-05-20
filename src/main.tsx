import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CourseContextProvider from "./context/CourseContextProvider.tsx";
import CartContextProvider from "./context/CartContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartContextProvider>
            <CourseContextProvider>
                <App/>
            </CourseContextProvider>
        </CartContextProvider>
    </StrictMode>,
)
