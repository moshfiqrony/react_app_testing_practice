import React, { useEffect } from 'react';
import axios from 'axios';


const App = (props) => {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('code')) {
            axios.post('https://gitlab.com/oauth/token', {
                client_id: "##",
                client_secret: "##",
                code: params.get('code'),
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:3000",
                code_verifier: "e8c3745e93a9c25ce5c2653ee36f5b4fa010b4f4df8dfbad7055f4d88551dd960fb5b7602cdfa61088951eac36429862946e86d20b15250a8f0159f1ad001605"
            })
                .then(res => {
                    console.log(res);
                })
        }
    }, []);


    return (
        <div>
            <a href={`https://gitlab.com/oauth/authorize?client_id=##&redirect_uri=http://localhost:3000&response_type=code&state=STATE&scope=read_user+api+read_api+read_repository&code_challenge=CxF5ZvoXa6Cz6IcX3VyRHxMPRXYbv4PADxko3dwPF-I&code_challenge_method=S256`}>Authenticate me</a>
        </div>
    );
}

export default App;