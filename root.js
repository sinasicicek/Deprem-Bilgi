const conta=document.querySelector(".container")

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



let konumName=Created("a")
konumName.setAttribute("href",params[3])
konumName.setAttribute("target","_blank")
konumName.textContent="Deprem Lokasyonu"
konumName.classList.add("konumLi")


let str=Created("h3")
    str.textContent=params[1];

let h5=Created("h5");
        h5.textContent=params[0];

       
let span=Created("span")
   if (siddet_no >4) {
       span.classList.add("span-red")
       /*span.classList.add("sala")
       div.classList.add("sala")*/
       }
      span.textContent=params[2];

let eklenecek=[str,h5,span,konumName]
    eklenecek.forEach( ekle=>{
            div.appendChild(ekle)
        })

return div;
}
const sayiToplam=0
function basla(kac_adet=100) {
    let bc=getir(kac_adet);
    bc.then( geldi=>{
   for (const key in geldi) {
      
       if (Object.hasOwnProperty.call(geldi, key)) 
       {
           const element = geldi[key];
          // console.log(geldi[key].length);
         
            for (let index = 0; index < element.length; index++) {
                const eleman = element[index];
                if(eleman === undefined){}
                else{
                // console.log(eleman["date"]);

 /*Json verileri  */
                 let tarih=eleman["date"];
                 let lokasyon=eleman["lokasyon"]
                 let siddet=eleman["mag"]
                 let konumArray=eleman["coordinates"]
                 console.log(konumArray[0]+"  "+konumArray[1]);
                 let konum="https://www.google.com/maps/place/"+konumArray[1]+"+"+konumArray[0]
             //  console.log(tarih+" "+lokasyon+" "+siddet );
/* -------------------------------------- */
                //  console.log(lokasyon)
             
if(tarih != null && lokasyon != null && siddet != null && konum !=null){
                let data=obj_build(tarih,lokasyon,siddet,konum)
                conta.appendChild(data)
                
       }
     
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
   
