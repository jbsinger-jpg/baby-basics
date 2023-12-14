import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const customTheme = extendTheme({ ...config });

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={customTheme}>
                <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
);