import React, { ClassType } from 'react'
import App from './App.tsx'
import './index.css'
import './App.css'
import Header from './Header.tsx'
import GameForm from './GameForm.tsx'

export function Filter_Name(A,S:string,ind=1){
  let C =[];
  function compare(C,D){
    return D.toLowerCase()==C.toLowerCase();
  }
  if(S=="")return A;
  for(let i=0;i<A.length;i++){
    for(let j=0;j<A[i][ind].length-S.length+1;j++){
      if(compare(A[i][ind][j],S[0])){
        let fo=true;
        for(let t=j+1;t<j+S.length;t++){
          if(!compare(A[i][ind][t],S[t-j])){
            fo=false
            break;
          }
        }
        if(fo){
          C.push(A[i]);
          break;
        }
      }
    }
  }
  return C;
}
export function Filter_Tags(A,S:string,ind=5){
  let C =[];
  console.log(A);
  function compare(C,D){
    
    if(C.length!=D.length)return false;
    for(let i=0;i<C.length;i++)
    if(C[i].toLowerCase()!=D[i].toLowerCase())return false;
    return true;
  }
  if(S=="")return A;
  for(let k=0;k<A.length;k++)
  for(let i=0;i<A[k][ind].length;i++){
    if(compare(A[k][ind][i],S)){
          C.push(A[k]);
          break;
        }
  }
  return C;
}
export async function Init(){
  console.log(localStorage.getItem("KidArea_User_Page"));
  return (
  <>
    <Header/>
    {localStorage.getItem("KidArea_User_Page")=="Main"&&<App/>}
    {localStorage.getItem("KidArea_User_Page")=="Upload"&&<GameForm/>}
    </>
  );
    
}
