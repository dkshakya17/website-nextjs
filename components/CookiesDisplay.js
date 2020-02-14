import React, {useState} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CookiesDisplay = ()=>  {
    let showCookiesAgreement = cookies.get("ShowCookiesAgreement");
    
    if(!showCookiesAgreement) {  
        let date = new Date();
        cookies.set("ShowCookiesAgreement", true,{expires: new Date(date.getFullYear() +10, date.getMonth(), date.getDate())});
    }

    const [showCookies, setShowCookies] = useState(cookies.get("ShowCookiesAgreement"));
    const onClearCookies = () => { 
        let date = new Date();
        cookies.set("ShowCookiesAgreement", false,{expires: new Date(date.getFullYear() +10, date.getMonth(), date.getDate())});
        setShowCookies(false);
    }

return <React.Fragment>
    {
         showCookies === "true"  ?  <div className="d-flex flex_wrap justify-content-center cookies">
         We use cookies to improve your experience. By continuing, you agree to our use of cookies. See our 
         <a href="/privacy-policy" target="_blank"> Cookie and Privacy Policy</a> 
         <img className="cross_icon" src="/icons/noun_Cross.svg" onClick={onClearCookies}/>
     </div> : null
    }

<style>{`
.cookies a {
    margin-left:5px;
}


.cookies .cross_icon {
    margin-left: 5px;
    margin-top: 5px;
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.cookies {
    font-family: 'Conv_clarika-grot-regular';
    text-align: center;
    font-size: 12px;
    padding: 2px 10px 2px;
    border-bottom: 1px solid #e3e3e3;
}
`}
</style>
</React.Fragment>
}

export default CookiesDisplay;