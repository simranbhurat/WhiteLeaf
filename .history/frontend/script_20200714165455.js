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
            
            div.id = e.dataTransfer.files[i].name;
            
            name = div.id;
            if (name.length > 15) {
                fileName.innerHTML = name.slice(0, 10) + "....";        
            } else {
                fileName.innerHTML = name;
            }

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);

            parentDiv.appendChild(div);
        }
}

function removeImage(e) {
    console.log(e.target.getAttribute('index'));
    var remImage = document.getElementById(e.target.getAttribute('index'));
    // var remButton = document.getElementById(e.target.getAttribute('index')+ "-removeButton") ;
    remImage.parentNode.removeChild(remImage);
    // remButton.parentNode.removeChild(remButton);
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
            var div = document.createElement('div');    //create a new div
            div.classList.add("container-img");         //add css to that div
            
            var img = document.createElement('img');    //create a new image tag
            var close = document.createElement('button');   //create the remove button
            var fileName = document.createElement('p');     //create the filename text to show on the image
            
            fileName.classList.add('file-name-text');       //add css to the filename text to decide it's position and color
            close.classList.add("middle");                  //add css to the "close" button
            img.classList.add("image");                     //add css to the image tagg to decide it's position

            close.type = "button";          //tell jQuery that the "close" is of type button or it'll always consider a button as a submit button 

            close.innerHTML = "Remove";     //set inner text of the button
            
            img.style.width = "100%";       //set image properties
            img.style.height = "auto";
            img.style.marginBottom = "10px";
            img.style.borderRadius = "4px";
            img.style.webkitBoxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.boxShadow = "1px 1px 5px 0px rgba(0, 0, 0, 1)";
            img.style.transition = ".5s ease";
            img.style.backfaceVisibility = "hidden";

            //set image source
            //list of images is present in even.target.files, it's a blol
            img.src = URL.createObjectURL(event.target.files[i]);
            
            div.id = event.target.files[i].name;
            
            name = div.id;
            if (name.length > 15) {
                fileName.innerHTML = name.slice(0, 10) + "....";        
            } else {
                fileName.innerHTML = name;
            }
            // close.id = name + "-removeButton";

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);
            parentDiv.appendChild(div);
        }
    };
}

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
                alert(response);
                $('#selectfile').val('');
            }
        });
    }
}