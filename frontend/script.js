var fileobj;
function upload_file(e) {
    e.preventDefault();
    ajax_file_upload(e.dataTransfer.files);

    var image = document.getElementById('output');
        console.log((e.dataTransfer.files).length);
        var i = 0;
        var parentDiv = document.getElementById('image_list_div');

        for (i = 0; i < (e.dataTransfer.files).length; i++) {
            var div = document.createElement('div');
            div.classList.add("container-img");
            div.classList.add('slide');
            
            var img = document.createElement('img');
            var close = document.createElement('button');
            var fileName = document.createElement('p');
            fileName.classList.add('file-name-text');
            close.type = "button";

            close.classList.add("middle");
            close.innerHTML = "Remove";
            img.classList.add("image");
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.marginBottom = "10px";
            img.style.borderRadius = "4px";
            img.style.webkitBoxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.boxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.transition = ".5s ease";
            img.style.backfaceVisibility = "hidden";

            img.src = URL.createObjectURL(e.dataTransfer.files[i]);
            
            img.id = e.dataTransfer.files[i].name;
            name = img.id;
            if (name.length > 15) {
                name = name.slice(0, 10) + "....";
                fileName.innerHTML = name;
            } else {
                fileName.innerHTML = name;
            }
            close.id = name + "-removeButton";

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);

            parentDiv.appendChild(div);
            var jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = "new-script.js";
            // finally insert the element to the body element in order to load the script
            document.body.appendChild(jsElm);
        }
}

function removeImage(e) {
    console.log(e.target.getAttribute('index'));
    var remImage = document.getElementById(e.target.getAttribute('index'));
    var remButton = document.getElementById(e.target.getAttribute('index')+ "-removeButton") ;
    remImage.parentNode.removeChild(remImage);
    remButton.parentNode.removeChild(remButton);
}
function file_explorer() {
    document.getElementById('selectfile').click();

    document.getElementById('selectfile').onchange = function () {
        files = document.getElementById('selectfile').files;
        ajax_file_upload(files);
        
        var image = document.getElementById('output');
        console.log((event.target.files).length);
        var i = 0;
        var parentDiv = document.getElementById('image_list_div');

        for (i = 0; i < (event.target.files).length; i++) {
            var div = document.createElement('div');
            div.classList.add("container-img");
            div.classList.add('slide');
            
            var img = document.createElement('img');
            var close = document.createElement('button');
            var fileName = document.createElement('p');
            fileName.classList.add('file-name-text');

            close.type = "button";

            close.classList.add("middle");
            close.innerHTML = "Remove";
            img.classList.add("image");
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.marginBottom = "10px";
            img.style.borderRadius = "4px";
            img.style.webkitBoxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.boxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.transition = ".5s ease";
            img.style.backfaceVisibility = "hidden";

            img.src = URL.createObjectURL(event.target.files[i]);
            
            img.id = event.target.files[i].name;
            name = img.id;
            if (name.length > 15) {
                name = name.slice(0, 10) + "....";
                fileName.innerHTML = name;
            } else {
                fileName.innerHTML = name;
            }
            close.id = name + "-removeButton";

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);
            var jsElm = document.createElement("script");
            // set the type attribute
            jsElm.type = "application/javascript";
            // make the script element load file
            jsElm.src = "new-script.js";
            // finally insert the element to the body element in order to load the script
            parentDiv.appendChild(div);
        }
            //set image source
            //list of images is present in even.target.files, it's a blob type
            //blob- binary large objects
            img.src = URL.createObjectURL(event.target.files[i]);
            
            //assign the filename to the new div
            div.id = event.target.files[i].name;
            
            name = div.id;

            //assign filename
            if (name.length > 15) {
                fileName.innerHTML = name.slice(0, 10) + "....";    //cut filename if it's bigger than 15chars      
            } else {
                fileName.innerHTML = name;
            }
            // close.id = name + "-removeButton";

            close.setAttribute('index', name);      //set the index attribute of the "close" button to the id of the div
            close.addEventListener("click", removeImage)  //add onclick listener to the "close" button
            
            document.getElementById("show_uploaded_images").style.display = "block";    //initally hidden div, make it visible
            
            //create a tree
            //  <div id="filename">
            //  <img/>
            //  <button>Remove<button>
            //  <p>filename</p>
            
            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);

            //add this tree to the "image_list_div" div
            parentDiv.appendChild(div);

        //so you get this
        //     <div id="show_uploaded_images" style="text-align: center; display: block;">
        //     <p style="align-self: center;">Selected Images</p>
        //     <div id="image_list_div">
        //     <div class="container-img" id="ui_before_circuit.png"><img class="image" src="blob:http://localhost/07b2222f-c854-43e6-9d86-cba3dc1c4ae5" style="width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px; box-shadow: rgb(0, 0, 0) 1px 1px 5px 0px; transition: all 0.5s ease 0s; backface-visibility: hidden;">
        //     <button type="button" class="middle" index="ui_before_circuit.png">Remove</button>
        //     <p class="file-name-text">ui_before_....</p></div><div class="container-img" id="ui_after.png"><img class="image" src="blob:http://localhost/0976fde0-aa46-4caa-b79b-964ed510da25" style="width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px; box-shadow: rgb(0, 0, 0) 1px 1px 5px 0px; transition: all 0.5s ease 0s; backface-visibility: hidden;"><button type="button" class="middle" index="ui_after.png">Remove</button><p class="file-name-text">ui_after.png</p></div></div>
        //     </div>
        }  
};

function ajax_file_upload(file_obj) {
    if (file_obj != undefined) {
        var form_data = new FormData();
        for (i = 0; i < file_obj.length; i++) {
            form_data.append('file[]', file_obj[i]);
        }
        $.ajax({
            type: 'POST',
            url: 'ajax.php',
            contentType: false,
            processData: false,
            data: form_data,
            success: function (response) {
                // alert(response);
                $('#selectfile').val('');
            }
        });
    }
}
