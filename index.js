const express = require('express')
const axios = require('axios')
const https = require('https');
const app = express()
const API_KEY = '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'

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})





app.post('/translate', (req, res) => {
    const text = req.body.text;
    const from_language = req.body.from_language;
    const to_language = req.body.to_language;

    axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
            
        },
        data: {
            model: 'text-davinci-003',
            prompt: ` ChatGPT Please Translate ${text} from ${from_language} to ${to_language} Language `,
            max_tokens: 1000
           
         
        }
    }).then(response => {
        if(response.data.choices){
            res.send(response.data.choices[0].text);
            console.log((response.data.choices[0].text));
        }
        else{
            res.send(response.data);
        }
    }).catch(error => {
        res.send(error.response.data);
    });
});



app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
})