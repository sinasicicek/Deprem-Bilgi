const conta=document.querySelector(".container")
async function getir() {
    const geti=await fetch("https://api.orhanaydogdu.com.tr/deprem/live.php?limit=20");
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
    basla()
},5000)