import express from 'express'
import reader from 'xlsx'
import path from "path"
import axios from "axios"
const __dirname = path.resolve();
import fetch from 'node-fetch'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function checkIfImageExists(url, callback) {

    //do stuff
    axios({
      method: "get",
      url: url
    })
  .then(response => {
      if (response.status===200) {
        callback(true)
      } else {
        callback(false)
      }
    })
    .catch(function(err) {
      console.log("Failed to fetch page: ", err);
    });
  
}

const timer = ms => new Promise(res => setTimeout(res, ms))

const file = reader.readFile(path.join(__dirname ,"./Himashu_project.xlsx"));
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
   file.Sheets[file.SheetNames[i]])

   for(var j=0;j<temp.length;j++){
    await timer(1000)

    axios({
      method: "get",
      url: temp[j]['Primary Image URL']
    })
    .then(response => {
      if (response.status===200) {
        data.push(temp[j]['Primary Image URL'])
        console.log("data is ",data)
        console.log("response is ",response)
      } else {
        console.log('failed');
      }
    })
    .catch(function(err) {
      console.log("Failed to fetch page: ", temp[j]['Primary Image URL']);
    })

   }

  //  temp.forEach(async (res) => {
  //   await timer(5000)

  //   // console.log("url is ",res['Primary Image URL'])

  //   // try{
      
  //   // }catch(error){
  //   //   console.log("error is ",error)
  //   // }
  //  })

}

// async function load () { // We need to wrap the loop into an async function for this to work
//   for (var i = 0; i < 3; i++) {
//     console.log(i);
//     await timer(3000); // then the created Promise can be awaited
//   }
// }

// load();