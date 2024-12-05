import './index.css';
import './gameone.css';
import './App.css'
import React from 'react';
import { db } from './smth';
import {getDocs,collection }from 'firebase/firestore';
import { Get_Doc } from './test';
export interface gameproperties{
  title: string,
  image: string,
  description_box: string,
  knowmore: string,
  DocRef:string
}
export interface gamepropertiesarr{
  array:gameproperties[]
}
async function downloadStringAsFile (stringData:string,name:string) {
  const blob = new Blob([stringData], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function g(game,index){
  return (
    <>
        <div  className="card_container">
          <center><div className="bold">{game.title}</div></center>
          <img className='image_container' src={game.image} alt="maths" />
          <center><div className="description_box">{game.description_box}</div></center>
          <center><button className="button" onClick={async ()=>{await downloadStringAsFile(await Get_Doc('Game_File',game.DocRef),game.title+".kar");}}>{game.knowmore}</button></center>
        </div>
    </>
  )
}
interface Input{
    A:[string,string,string,string,string,string[]][]
}
//<img className='image_container' src={game} alt="maths" />
export function GameOne({A}:Input) {
   let array:gameproperties[]=[];
   for(let i=0;i<A.length;i++){
    let s="";
    if(A[i][5].length==0)s="_";
    for(let j=0;j<A[i][5].length;j++)s+=A[i][5][j]+" ";
    array.push({title:A[i][1],image:A[i][4],description_box:s,knowmore:"Download now!",DocRef:A[i][3]})
   }
  return (
    <div className="container1">
      {array.map((game, index) => 
        <>
        {g(game,index)}
        </>
      )}
    </div>
  );
}
