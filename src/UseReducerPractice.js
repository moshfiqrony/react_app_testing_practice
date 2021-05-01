import React, { createContext, memo, useContext, useState } from 'react';

export const RootContext = createContext();

const App = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return <RootContext.Provider>
        <form onSubmit={handleSubmit}>
            <Child1 />
            <button type='submit'>Submit</button>
        </form>
    </RootContext.Provider>
}

export const Child1 = memo(() => {
    return <div>
        <input type="text" name='username' id='username'/>
        <Child2 />
    </div>
})

export const Child2 = () => {
    return <div>
        <input type="text" name='password' id='password'/>
    </div>
}


export default App;