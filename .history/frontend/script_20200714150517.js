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
            close.classList.add("middle");
            close.type = "button";
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
            fileName.innerHTML = name;
            close.id = name + "-removeButton";

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
            

            parentDiv.appendChild(div);
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
            
            var img = document.createElement('img');
            var close = document.createElement('button');
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
            close.id = name + "-removeButton";

            close.setAttribute('index', name);
            close.addEventListener("click", removeImage)
            document.getElementById("show_uploaded_images").style.display = "block";
            div.appendChild(img);
            div.appendChild(close);
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