import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {App} from "./App.jsx";
import colors from "./constants/colors.js";
import {LoadingProvider} from "./context/Loading/index.jsx";
import {Loading} from "./components/molecules/Loading/index.jsx";
import '@fontsource/poppins';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

const theme = extendTheme({
    fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
    },
    colors: {
        brand: {
            100: `${colors.main}20`,
            200: colors.main,
            300: colors.main,
            400: colors.main,
            500: colors.main,
            600: colors.main,
            700: colors.main,
            800: colors.main,
            900: colors.main,
        },
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'brand'
            }
        },
        Input: {
            defaultProps: {
                colorScheme: 'brand',
                focusBorderColor: 'brand.400'
            }
        },
        Stepper: {
            defaultProps: {
                colorScheme: 'brand',
                emptyColor: 'gray.400',
            }
        },
        Select: {
            defaultProps: {
                colorScheme: 'brand',
                focusBorderColor: 'brand.400'
            }
        },
        Radio: {
            defaultProps: {
                colorScheme: 'brand',
            }
        },
        CircularProgress: {
            defaultProps: {
                thickness: '4px',
                speed: '0.65s',
                colorScheme: 'brand',
                color: 'brand.400',
                emptyColor: 'gray.200',
                size: 'xl',
            }
        },
    }
})


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <LoadingProvider>
                <Loading>
                    <App/>
                </Loading>
            </LoadingProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
