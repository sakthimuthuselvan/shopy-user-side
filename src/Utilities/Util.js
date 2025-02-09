import CryptoJS from 'crypto-js';

export const encrypt = (inputText) => {
    console.log(inputText);
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    console.log("secretKey ", secretKey);
    const encrypted = CryptoJS.AES.encrypt(inputText, secretKey).toString();
    return encrypted;
}

export const decrypt = (encryptedText) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export const  lightenColor=(hex, percent = 0.9)=> {
    let num = parseInt(hex.replace("#", ""), 16),
        r = (num >> 16) + Math.round(255 * percent),
        g = ((num >> 8) & 0x00FF) + Math.round(255 * percent),
        b = (num & 0x0000FF) + Math.round(255 * percent);

    r = r > 255 ? 255 : r;
    g = g > 255 ? 255 : g;
    b = b > 255 ? 255 : b;

    return `rgb(${r}, ${g}, ${b})`;
}
