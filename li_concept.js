const ul=Created("ul");
const li=Created("li");
li.classList.add("li_padding")
   const hr_üst=Created("hr")       
  
      const h1=Created("h1")
       h1.textContent="Tarih :"+tarih;
       const hr=Created("hr")

       const h2=Created("h2");
       h2.textContent=lokasyon+"  "+"Deprem Siddeti: "+siddet

       li.appendChild(hr_üst)
       li.appendChild(h1)
       li.appendChild(h2)
     
      li.appendChild(hr)
      

       ul.appendChild(li);