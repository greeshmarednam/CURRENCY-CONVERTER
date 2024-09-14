const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");

let c=0
for(let select of dropdowns){
    for(CurrCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=CurrCode;
        newoption.value=CurrCode;
        if (select.name==="from" && CurrCode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="To" && CurrCode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) =>{
        updateflag(evt.target);
    });
}
const updateflag= (element)=> {
    let CurrCode=element.value;
    let countrycode=countryList[CurrCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click", async (evt)=>{
    c=1
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amountvalue=amount.value;
    if (amountvalue==="" || amountvalue<1){
        amountvalue=1;
        amount.value="1";
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountvalue * rate;
    if (c==1){
        msg.innerHTML = `<b>${amountvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}</b>`;
    }
    c=0
})