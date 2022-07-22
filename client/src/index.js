import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {extendTheme, ChakraProvider} from "@chakra-ui/react";

//extend the chakra ui theme to match our color scheme for the toast
const customTheme = extendTheme({
  components: {
    Alert: {
      variants: {
        // define own toast variant
        pink: {
          container: {
            color: "gray.50",
            bg: "pink.400"
          }
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

