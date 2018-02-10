import React from 'react';
import ReactDOM from 'react-dom';
/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); */

import AppRoutes from './AppRoutes';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client =  new ApolloClient({
    link: new HttpLink({ uri: '/' }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client = {client}>  
       <AppRoutes />
    </ApolloProvider>,
    document.getElementById('root')
);