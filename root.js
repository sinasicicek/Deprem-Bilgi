const conta=document.querySelector(".container")
<<<<<<< HEAD
async function getir(kac) {
    let kac_adet="https://api.orhanaydogdu.com.tr/deprem/live.php?limit="
    const geti=await fetch(`${kac_adet}`+kac);
    return await geti.json()
}

function Created(veri){ return document.createElement(veri)}

function obj_build(...params) {

    let div=document.createElement("div")
    let siddet_no=Number(params[2])
    let sinif=["items","brdr"]
        div.classList.add(...sinif)


  

let str=Created("h3")
    str.textContent=params[1];

let h5=Created("h5");
        h5.textContent=params[0];

       
let span=Created("span")
   if (siddet_no >4) {
       span.classList.add("span-red")
       span.classList.add("sala")
       div.classList.add("sala")
       }
      span.textContent=params[2];

let eklenecek=[str,h5,span]
    eklenecek.forEach( ekle=>{
            div.appendChild(ekle)
        })

return div;
}

function basla(kac_adet=15) {
    let bc=getir(kac_adet);
    bc.then( geldi=>{
   for (const key in geldi) {
      
       if (Object.hasOwnProperty.call(geldi, key)) 
       {
           const element = geldi[key];
           console.log(geldi[key].length);
         
            for (let index = 0; index < element.length; index++) {
                const eleman = element[index];
                if(eleman === undefined){}
                else{
                // console.log(eleman["date"]);

 /*Json verileri  */
                 let tarih=eleman["date"];
                 let lokasyon=eleman["lokasyon"]
                 let siddet=eleman["mag"]
               //console.log(tarih+" "+lokasyon+" "+siddet );
/* -------------------------------------- */
                let data=obj_build(tarih,lokasyon,siddet)

                conta.appendChild(data)
 
          
     
                }
            }
       } 
   }

})
}
basla();
setInterval(()=>{
    conta.innerHTML=""
    basla()
},60000)

const buton=document.querySelector("#ref")
buton.addEventListener("click",()=>{
 
 conta.innerHTML=""
  basla()
})



const buton_filter=document.querySelector("#filter")
const input_kac=document.querySelector("#inpt_kac")

buton_filter.addEventListener("click",()=>{
 
    conta.innerHTML=""
     basla(input_kac.value)
   })
   
=======
async function getir() {
    const geti=await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php?limit=50");
    return await geti.json()
}

function Created(veri){ return document.createElement(veri)}

function obj_build(...params) {

    let div=document.createElement("div")
    let siddet_no=Number(params[2])
    let sinif=["items","brdr"]
        div.classList.add(...sinif)


  

let str=Created("h3")
    str.textContent=params[1];

let h5=Created("h5");
        h5.textContent=params[0];

       
let span=Created("span")
   if (siddet_no >4) {
       span.classList.add("span-red")
       span.classList.add("sala")
       div.classList.add("sala")
       }
      span.textContent=params[2];

let eklenecek=[str,h5,span]
    eklenecek.forEach( ekle=>{
            div.appendChild(ekle)
        })

return div;
}

function basla() {
    let bc=getir();
    bc.then( geldi=>{
   for (const key in geldi) {
      
       if (Object.hasOwnProperty.call(geldi, key)) 
       {
           const element = geldi[key];
           console.log(geldi[key].length);
         
            for (let index = 0; index < element.length; index++) {
                const eleman = element[index];
                if(eleman === undefined){}
                else{
                // console.log(eleman["date"]);

 /*Json verileri  */
                 let tarih=eleman["date"];
                 let lokasyon=eleman["lokasyon"]
                 let siddet=eleman["mag"]
               //console.log(tarih+" "+lokasyon+" "+siddet );
/* -------------------------------------- */
                let data=obj_build(tarih,lokasyon,siddet)

                conta.appendChild(data)
 
          
     
                }
            }
       } 
   }

})
}
basla();
setInterval(()=>{
    conta.innerHTML=""
    basla()
},60000)

const buton=document.querySelector("#ref")
buton.addEventListener("click",()=>{
 
 conta.innerHTML=""
  basla()
})
>>>>>>> 67b8e37e1d0f286a1ed02eb33822dd3eb1597508
