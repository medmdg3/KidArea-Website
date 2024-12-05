
import { useState } from 'react';
import './App.css'
import { GET_A, GET_MyGames } from './main';
import { GameOne } from './Game';
import { Filter_Name, Filter_Tags } from './mymain';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.css'
import './gameOne.css'
function f(i,n,array){
  if(n>i+3 ){
    return (
      [array[i],array[i+1],array[i+2],array[i+3]]
    )
  }
  if(n==i+3){
    return (
      [array[i],array[i+1],array[i+2]]
    )
  }
  if(n==i+2){
    return (
      [array[i],array[i+1]]
    )
  }
  if(n==i+1){
    return (
      [array[i]]
    )
  }
  return (
    []
  )
}
function App() {
  let All=GET_A();
  if(localStorage.getItem("KidArea_Main_Detail")=="MyGames"){
    All=GET_MyGames();
  }
  const queryParameters = new URLSearchParams(window.location.search);
  console.log("HEre!");
  let [Tags,setTags]=useState(All);
  let [C,setC]=useState(All);
  let [searchN,setsearchN]=useState("");
  let [search,setsearch]=useState("");
   const Comput_Tags= async()=>{
    let H=All;

    let t="";
    let sea=search.trim();
    for(let i=0;i<=sea.length;i++){
      if(i==sea.length||sea[i]==" "){
        if(t.trim().length!=0){
        H=Filter_Tags(H,t,5);
        t="";
        }
      }else t+=sea[i];
      console.log(t);
    }
    console.log(H);
    await setTags (H);
    await setC(H);
    setsearchN("");
  }
  return (
    <>
    
    <div>
    <center>
      <input
          type="text"
          className="searchBarInput"
          value={searchN}
          onChange={(event)=>{setsearchN(event.target.value);}}
          onKeyDown={(event)=>{if(event.key!=='Enter')return;setC(Filter_Name(Tags,searchN,1));}}
          placeholder='Filter by name...'
        />
      <input
          type="text"
          className="searchBarInput"
          value={search}
          onChange={(event)=>{setsearch(event.target.value);}}
          onKeyDown={async (event)=>{if(event.key!=='Enter')return;await Comput_Tags();if(search.length)if(search[search.length-1]!=' ')setsearch(search+" ");}}
          placeholder='Filter by tags...'
        />
      </center>
      <br />
      <center>
      <div className="container">
      <center>
      {C.map((game, index) => (
        <>
        {index%4==0 &&<div key={game[0]}><div className="span.box"><GameOne A={f(index,C.length,C)}/> </div> </div>}
        </>
      ))}
      </center>
    </div>
    </center>
    <br />
    <br />
    <Footer/>
    </div>
    </>
  );
}
export default App
