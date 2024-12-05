import React, { useState } from 'react';
import './App2.css'; 
import { db } from './smth';
import { auth } from './smth';
import { doc,addDoc, collection, setDoc } from 'firebase/firestore';
async function Add_Game(game,image,title,tags,author) {
    if(auth.currentUser==null)return false;

    try{
        console.log(game);
        let coll=collection(db,'Game_File');
        let t=await addDoc(coll,{Data:game});
        coll=collection(db,'Games_Info');
        t=await addDoc(coll,{Author:author,Doc_Ref:t.id,Id:"None",Img:image,Tags:tags,Title:title});
        await setDoc(doc(db,'Games_Info',t.id),{Author:author,Doc_Ref:t.id,Id:t.id,Img:image,Tags:tags,Title:title});
        return true;
    }catch(error){
        console.error(error);
        return false;
    }
}
const GameForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
        let n=tagInput.trim().length;
        for(let i=0;i<tags.length;i++){
            n+=tags[i].length+1;
            if(tags[i]==tagInput.trim()){
                return;
            }
        }
        if(n>18){
            alert("Too large tags!");
            return;
        }
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file && file.size<=1000000) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          setFile(text);
        };
        reader.readAsText(file);
      }else{
        alert("Please select an image with a size lower then 1MB!");
      }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file && file.size<=1000000) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          setImage(imageUrl);
        };
        reader.readAsDataURL(file);
      }else{
        alert("Please select an image with a size lower then 1MB!");
      }
  };

  const handleSubmit = () => {
    const titleRegex = /^[a-zA-Z\s]+$/;
    if (!titleRegex.test(title)) {
        alert("Title should contain only letters and spaces.");
        return;
    }
    if ((title.length>15)) {
        alert("The title shouldn't exceed 15 characters!");
        return;
    }
    if (file=="" || file.length > 1024 * 1024) {
        alert("Please select a valid file with a size less then 1 MB.");
        return;
    }
    if (image=="" || image.length > 1024 * 1024) {
        alert("Please select an image with a size less then 1 MB.");
        return;
    }
    
    setSubmitted(true);
}


  if (submitted) {
    setSubmitted(false);
    Add_Game(file,image,title,tags,auth.currentUser?.email);
    setFile("");
    setImage("");
    setTitle("");
    setTags([]);
  }

  return (
    <div className="form-container">
        <h1>Form</h1>
        <div>
        <strong><label htmlFor="title">Game's title:</label></strong>
          <input type="text" className="input-field" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give a title for the game" required />
        </div>
      
        <div>
        <strong><label>Tags:</label></strong>
          <div>
            {tags.map((tag, index) => (
              <span key={index}>
                {tag}
                <button type="button" onClick={() => handleTagDelete(tag)}>X</button>
              </span>
            ))}
          </div>
          <input type="text" className="input-field" value={tagInput} onChange={handleTagChange} onKeyDown={handleTagKeyDown} placeholder="Add a tag"/>
        </div>
        <div>
        <strong><label htmlFor="description">Description:</label><br></br></strong>
          <textarea className="input-field" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description" required/>
        </div>
        <div>
        <strong><label htmlFor="file">Import file:</label></strong>
          <input type="file" className="input-field" id="file" accept=".kar" onChange={handleFileChange} />
        </div>
        <div>
        <strong><label htmlFor="image">Import image:</label></strong>
          <input type="file" className="input-field" id="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button className="btn" onClick={()=>{handleSubmit();}}>Submit</button>
    </div>
  );
};

export default GameForm;




