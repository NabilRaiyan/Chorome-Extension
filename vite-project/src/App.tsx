import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState('');

  const getUrl = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.scripting.executeScript({
      target: {tabId: tab.id!},
      args: [tab],
      func: (tab) => {
        const url = tab.url;
        try{
          const queryString = url?.split('?')[1];
          const searchParam = new URLSearchParams(queryString);
          const searchString = searchParam.get('q');
          const searchWords = searchString ? searchString.split('%20'): [];
          console.log(searchWords)
          if(searchWords === null || searchWords.length === 0){
            const query = url?.split('/');
            const lastWord = query ? query[query.length - 1] : '';
            console.log(lastWord);
          }
        }
        catch(e){
          console.log(e)
        }
        
      }
    });
  };
  
  // Call the function
  getUrl();
  
  

  const alertFunc = async ()=> {
    const [tab] = await chrome.tabs.query({active: true});
    chrome.scripting.executeScript<string[], void>({
      target: {tabId: tab.id!},
      args: [color],
      func: (color)=>{
        document.body.style.backgroundColor = color;
      }
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <input type='color' onChange={(e) => setColor(e.currentTarget.value) }></input>
        <button onClick={alertFunc}>Click me</button>
        <button onClick={getUrl}>Get Url</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
