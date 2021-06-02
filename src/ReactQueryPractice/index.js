import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider, useQueryClient, useMutation } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Component />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

const getData = () => axios('http://localhost:8000/me/', {
    headers: {
        'Authorization': `Token 49006dc94557dc214a463830a145b785f6ff6683` 
      }
})

export const Component = () => {
    // const {isLoading, error, data} = useQuery('fetchUser', () => axios('http://api-mr.herokuapp.com/users'))
    const {isLoading, error, data} = useQuery('inboxRead', getData,
    {
        staleTime: Infinity,
        retry: false,
        // initialData: []
    })
    const queryClient = useQueryClient()

    const addNewUser = (data) => {
        return axios.post('http://api-mr.herokuapp.com/users', data);
    }

    const mutation = useMutation(addNewUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('fetchUser');
        }
    })

    return (
        <div className="App">
            <h1>React Query example with Star Wars API</h1>
            {error && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <pre>{JSON.stringify(data?.data, null, 2)}
                </pre>
            )}
            <button onClick={() => {
                mutation.mutate({
                    username: 'ajksdh',
                    password: 'askdfjlasdlf'
                })
            }}>add new user</button>
        </div>
    );
}

export default App;