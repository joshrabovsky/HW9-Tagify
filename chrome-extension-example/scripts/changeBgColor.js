function createSpan(color, textColor, text){
  // Create label
  let span = document.createElement("span")
  span.textContent = text
  span.style.color = textColor;
  span.style.backgroundColor = color
  span.style.borderRadius = "40px"
  span.style.padding = "5px 20px"
  span.style.margin = "0px 10px"
  span.style.fontSize = "1rem";
  span.style.font = 'Verdana'
  span.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
  return span
}

const getUserInformation = async function (username, count) {
  let query = `https://ec2-54-91-175-5.compute-1.amazonaws.com/api/cohere${username}`
  fetch(query).then(
    (resp) => resp.json()
  ).then(
    (resp) => {
      let sortedPredictions = resp.sort((x1, x2) => {
        return parseInt(x1.likelihood) < parseInt(x2.likelihood)
      })
      return sortedPredictions.slice(0, count)
    }
  )
}

chrome.storage.sync.get("Add Labels", async () => {

  let usernames = document.querySelectorAll("article .css-1dbjc4n.r-k4xj1c.r-18u37iz.r-1wtj0ep a div[dir=ltr] > span")

  for (let user of usernames){

    // Once HTTP vs. HTTPS protocol issues sorted
    // for(let text of getUserInformation(user.textContent.slice(1))){
    //   let span = createSpan("#FFA500", "white", text)
    //   parent.appendChild(span)
    // }
     
    let parent = user.parentNode
    let span1 = createSpan("#FFA500", "white", "HELLO")
    let span2 = createSpan("#FFA500", "white", "HELLO")
    parent.appendChild(span1)
    parent.appendChild(span1)
  }

  let isHover = false
  addEventListener('mousemove', (event) => {
    setTimeout(checkIfHover, 1000)
  });

  function checkIfHover(){
    if(document.querySelector("div[data-testid=HoverCard]") && !isHover){
      isHover = true
      let hoverDiv = document.querySelector("div[data-testid=HoverCard]");
      let parent = hoverDiv.firstChild.firstChild

      // Create label
      let span = createSpan("#003366", "white")
      let div = document.createElement("div")
      div.style.margin = "10px 0px"
      div.appendChild(span)
      parent.appendChild(div)
    }
    else if(isHover && !document.querySelector("div[data-testid=HoverCard]")){
      isHover = false
    }
  }
});