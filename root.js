
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
function depremAdeti()
{
 const div=Created("div")
 div.id="depremAdeti"

const input=Created("input")
input.type="number"
input.id="inputdepremnumber"
input.classList.add("input_deprem")
div.appendChild(input)

const btn=Created("button")
btn.innerHTML="Getir"
btn.classList.add("adet_btn")

btn.addEventListener("click",()=>{
    const sayi_kaci=document.getElementById("inputdepremnumber")

    if (sayi_kaci.value !=null) {
        conta.innerHTML=""
        basla(sayi_kaci.value)
    } else {
        alert("Lütfen Sayi giriniz")
    }

    }
    
    
    )


div.appendChild(btn)

 return div   
}
function basla(kac_adet=100) {
    let bc=getir(kac_adet);
    /*depremadeti func cagır */
    const adet=depremAdeti()
    const baslik=Created("h1")
    baslik.innerHTML="Sondan başa dogru kaç adet deprem gösterilsin"
    baslik.classList.add("baslik_deprem")
    const altbaslik=Created("h1")
    altbaslik.innerHTML="* Şuan da "+kac_adet+" adet Deprem Gösteriliyor *"
    altbaslik.classList.add("baslik_deprem")

    const br=Created("br")

    conta.appendChild(baslik)
    conta.appendChild(altbaslik)
    conta.appendChild(adet)
    conta.appendChild(br)
    
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
   