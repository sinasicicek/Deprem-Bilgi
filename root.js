const conta=document.querySelector(".container")

async function getir(adet=20) {
    const geti=await fetch(`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=${adet}`);
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
        if (siddet_no >4 && siddet_no <9){
            Noti(siddet_no,params[1],params[0])
        }
       
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

function basla(kac_adet=20) {
    let bc=getir(kac_adet);
    bc.then( geldi=>{
   for (const key in geldi) {
      
       if (Object.hasOwnProperty.call(geldi, key)) 
       {
           const element = geldi[key];
           console.log("basla ıcınde"+geldi[key].length);
         
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
  izin();
})



/*Bildirim olarak gonderebiliyoruz */
function izin(params) {
    Notification.requestPermission().then(function(result) {
        console.log("izin gedli");
        Noti()
      });
}

function Noti(...params) {
    var img = '/to-do-notifications/img/icon-128.png';
var text = params[2]+" " + params[0] + ' /'+params[1];
var notification = new Notification('To do list', { body: text, icon: img });
}



const btn_getir=document.querySelector(".btn-getir");
btn_getir.addEventListener('click',()=>{
    const deger=document.querySelector("#deprem_number")
    let calis=new deprem_filter()
    calis.filter(deger.value);
})

class deprem_filter{
    filter(deger){
        console.log("class icince"+deger);
        if(deger.value === null){ deger =20}
        else{
            conta.innerHTML=""
            basla(deger)
        }
     
    }
}