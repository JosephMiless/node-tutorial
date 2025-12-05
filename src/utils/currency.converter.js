import axios from "axios";
import { config } from "../config/env.js";

export const convertCurrency = async (from, to, amount) => {
    try {

        const url = `https://api.apilayer.com/currency_data/convert?from=${from}&to=${to}&amount=${amount}`;

        const response = await axios.get(url, {
            headers: { apikey:config.apiKey },
        });

        console.log("data", response.data);

    return response.data.result;
        
    } catch (error) {

        console.error(`Error converting currency. Error: ${error}`);
        
        // return res.status(500).json({error: `Internal Server Error.`});
        
    }
};

// export const convertCurrency = async (from, to, amount) => {
//     try {

//         let result;

//         const rate = 1450.88;

//         if(from === 'USD') {

//             result = amount * rate;

//             return result;

//         };

//         result = amount / rate;

//         return result;
        
//     } catch (error) {

//         console.error(`Error converting currency`);
        
//     }
// };