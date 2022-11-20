/*global chrome*/

export async function changeColor() {
    chrome.storage.sync.set({}, ()=>{});
  
    await chrome.tabs.query({active: true, currentWindow: true}, 
      (
        r => {
        chrome.tabs.executeScript(r[0].id , {file: 'scripts/changeBgColor.js'}, function() {
          if(chrome.runtime.lastError) {
            console.error("Script injection failed: " + chrome.runtime.lastError.message);
          }
        })
      }
    ));
    
  }