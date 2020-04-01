// var createForm=document.querySelector("#form1");
// var createInput1=document.querySelector("#form-input-1");
// var createInput2=document.querySelector("#form-input-2");
// var createInput3=document.querySelector("#form-input-3");

// createForm.addEventListener("submit",createInfo);


// function createInfo(e){
//     e.preventDefault();
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST","/campgrounds",true);
//     xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
//     var formData= JSON.stringify({name:createInput1.value,image:createInput2.value,description:createInput3.value});
    
//     xhr.onload =function(){
//         console.log(this.status);
//         if(this.status ==200){
//             console.log(this.responseText);
//             alert("New Campground added!!!");
//             createForm.reset();
//         }
//     }
//     xhr.send(formData);
// }
