import React from 'react'
import Intro from "./components/Intro.component";
import Form from "./components/Form/Form.components";

function App() {
    return (
        <div className={'wrapper'}>
            <div className={'content-wrapper'}>
            <Intro/>
            <Form />
            </div>
        </div>
    );
}

export default App;
