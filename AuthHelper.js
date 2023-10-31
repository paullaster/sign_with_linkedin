import 'dotenv/config';
import querystring from 'node:querystring';
import axios from 'axios';

const AuthHelper = () => {
    // client id
    // response type
    // redirect url
    // scope
    // state -optional
    console.log(process.env.LINKEDIN_AUTH_URI);

    return encodeURI(`${process.env.LINKEDIN_AUTH_URI}?client_id=${process.env.LINKEDIN_CLIENT_ID}&response_type=code&scope=${process.env.LINKEDIN_SCOPE}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}`)
}

const RedirectHelper = async(code) => {

    const payload = {
        client_id:  process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        grant_type: 'authorization_code',
        code,
        
    };

    const {data} = await axios({
        uri: `${process.env.LINKEDIN_ACCESS_TOKEN_URI}?${querystring.stringify(payload)}`,
        method: 'POST',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    }).then((response) => {
        console.log("response", response);
        return response
    }).catch((err) =>{
        console.log("error", err);
        return err;
    });

    console.log("data", data);
    return data;
}

export {
    AuthHelper,
    RedirectHelper,
};