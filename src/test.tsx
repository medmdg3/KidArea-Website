/*
User_Basics: 
	Id,User_Name,Email,User_Games_Ref:string
User_Games:
	Id,User_Ref:string
	Inventory_Refs,Creation_Refs:string[] (Contains references to the games that the user downloaded/created)
Games_Info:
	Id, Title,Author,File_Ref,Img:string
	Tags:string[]
Games_File:
	File:string
*/
import { db } from "./smth";
import { useState } from "react";
import {  collection, getDoc, getDocs,doc, getFirestore } from 'firebase/firestore';
export function Get_Users_Basics(){
	return [
		["16777216","MsiaOKMM","msia.okmmi@gmail.com","Gda72GTfqedha"],["543213","Usr","random.user@gmail.com","FSDUFHEWF233HB2"],
		["635254","Devo","random.Developper@gmail.com","JHG23gyuiugGGiU"],["6753454","Std","randomstudent@gmail.com","C42dgaFFeg"]];
}
export function Get_User_Basics(Ref){
	if(Ref==="IHds3278UIG")return ["16777216","MsiaOKMM","msia.okmmi@gmail.com","Gda72GTfqedha"];
	if(Ref==="DA32DFAS3") return ["635254","Devo","random.Developper@gmail.com","JHG23gyuiugGGiU"];
	if(Ref==="ZHdqw3278UIG")return ["635254","Devo","random.Developper@gmail.com","JHG23gyuiugGGiU"];
	if(Ref==="HA122DFAS3") return ["6753454","Std","randomstudent@gmail.com","C42dgaFFeg"];
	return ["","","",""];
}
export function Add_User_Basics(L){return;}
export function Remove_User_Basics(Ref){return ;}
//
export function Get_Users_Games(){
	return [
		["16777216","IHds3278UIG",["SDYGUDS","SIDHIS","SDUIHIW"],["SIDHIS","SDUIHIW"]],["543213","DA32DFAS3",[],[]],
		["635254","ZHdqw3278UIG",["SDYGUDS","AHEEWDSD"],["SDYGUDS","AHEEWDSD"]],["6753454","HA122DFAS3",["SIDHIS","AHEEWDSD"],[]]];
}
export function Get_User_Games(Ref){
	if(Ref==="Gda72GTfqedha")return ["16777216","IHds3278UIG",["SDYGUDS","SIDHIS","SDUIHIW"],["SIDHIS","SDUIHIW"]];
	if(Ref==="FSDUFHEWF233HB2") return ["543213","DA32DFAS3",[],[]];
	if(Ref==="JHG23gyuiugGGiU")return ["635254","ZHdqw3278UIG",["SDYGUDS","AHEEWDSD"],["SDYGUDS","AHEEWDSD"]];
	if(Ref==="C42dgaFFeg") return ["6753454","HA122DFAS3",["SIDHIS","AHEEWDSD"],[]];
	return ["","",[],[]];
}
export function Add_User_Games(L){return;}
export function Remove_User_Games(Ref){return ;}
export const Get_Data = async (File) => {
		
	try {
		
	  const usersCollectionRef = collection(db, File);
	  const usersSnapshot = await getDocs(usersCollectionRef);
	  return usersSnapshot;
	  
	} catch (error) {
	  console.error('Error fetching data: ', error);
	}
	return [];
  };
  export const Get_Doc = async (collection,doc_Id) => {
		console.log(collection+doc_Id);
	try {
		const docRef  = doc(db, collection,doc_Id);
	  const usersSnapshot = await getDoc(docRef );
	  return (usersSnapshot.data().Data);
	  
	} catch (error) {
	  console.log('Error fetching data: ', error);
	}
	return "An error happened!";
  };
export async function Get_Games_Infos  () {
	let usersSnapshot=await Get_Data('Games_Info');
	let userData:[string,string,string,string,string,string[]][] =[]
	  usersSnapshot.forEach((doc) => {
		userData.push(["","","","","",["",""]]);
		let H=doc.data();
		userData[userData.length-1][0]=String(H.Id);
		userData[userData.length-1][1]=String(H.Title);
		userData[userData.length-1][2]=String(H.Author);
		userData[userData.length-1][3]=String(H.Doc_Ref);
		userData[userData.length-1][4]=String(H.Img);
		userData[userData.length-1][5]=[]
		for(let i=0;i<H.Tags.length;i++)userData[userData.length-1][5].push(String(H.Tags[i]));
	  });
	  // Update state with fetched data
	  return userData;
};
export async function Get_Game_Infos(Ref){
	let h=await Get_Data('Games_Info');
	let T:[string,string,string,string,string,string[]] =["","","","","",[]];
	h.forEach((doc)=>{
		if(doc.ref.id==Ref){
		let H=doc.data();
		T[0]=String(H.Id);
		T[1]=String(H.Title);
		T[2]=String(H.Author);
		T[3]=String(H.Doc_Ref);
		T[4]=String(H.Img);
		T[5]=[]
		for(let i=0;i<H.Tags.length;i++)T[5].push(String(H.Tags[i]));
		}
	});
	return T;
}
export function Add_Game_Infos(L){return;}
export function Remove_Game_Infos(Ref){return;}
//
export function Get_Games_File(){
	return ["fserfessefes","wrefsfwefwe","fdsfwefsdf","zxcesfwev"];
}
export function Get_Game_File(Ref){
	if(Ref==="GYUQW328G")return "fserfessefes";
	if(Ref==="YTDFGHWWD") return "wrefsfwefwe";
	if(Ref==="YGUSAGHV")return "fdsfwefsdf";
	if(Ref==="CYTHSFCDSD") return "zxcesfwev";
	return "";
}
export function Add_Game_File(L){return;}
export function Remove_Game_File(Ref){return;}