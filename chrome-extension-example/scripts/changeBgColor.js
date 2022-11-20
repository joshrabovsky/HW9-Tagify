chrome.storage.sync.get("color", ({ color }) => {
  
// var div=document.querySelector("div[data-testid=HoverCard]").innerText
//div.innerText= div.innerText + " hello world";

addEventListener('mouseenter', (event) => {});
onmousemove = (event) => { 
  if (document.querySelector("div[data-testid=HoverCard]")){
    
    
    var hoverDiv=document.querySelector("div[data-testid=HoverCard]");

    hoverDiv.firstChild.firstChild.innerHTML = 
document.querySelector("div[data-testid=HoverCard]").firstChild.firstChild.innerHTML + 
"<style> .cohere-tags{width: 65px;height: 18px;font-family: 'Inter';font-style: normal;font-weight: 400;font-size: 12px;line-height: 18px;/* identical to box height, or 150% */display: flex;align-items: center;text-align: center;color: #000000;}</style><div class='outer'><div class='tags-row'><div class='cohere-tags'>TEST</div></div></div>"
   //console.log(document.querySelector("div[data-testid=HoverCard]").innerText)
  }else{
    document.body.style.backgroundColor = "white";
    //console.log('FALSE')
  }
 };

  });