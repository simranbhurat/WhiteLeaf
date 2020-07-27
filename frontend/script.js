var fileobj;
var filesToUpload = [];
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function upload_file(e) {
    e.preventDefault();
    // ajax_file_upload(e.dataTransfer.files);

    var image = document.getElementById('output');
    console.log((e.dataTransfer.files).length);
    var i = 0;
    var parentDiv = document.getElementById('image_list_div');

    for (i = 0; i < (e.dataTransfer.files).length; i++) {

        if (filesToUpload.length > 5) {
            alert("Please upload only 5 image files.");
            return;
        }
        filesToUpload.push(e.dataTransfer.files[i]);

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
    var remfile = e.target.getAttribute('assoc-file');
    console.log(e.target.getAttribute('index'));
    //get the div whose id is the filename to be deleted
    var remImage = document.getElementById(e.target.getAttribute('index'));
    //remove that div
    remImage.parentNode.removeChild(remImage);
    for (var i = 0; i < filesToUpload.length; i++) {
        console.log(filesToUpload[i].name);
        console.log(remfile);
        if (filesToUpload[i].name == remfile) {
            filesToUpload.splice(i, 1);
        }
    }
}
function file_explorer() {
    document.getElementById('selectfile').click();

    document.getElementById('selectfile').onchange = function () {
        files = document.getElementById('selectfile').files;
        // ajax_file_upload(files);

        console.log((event.target.files).length);
        var i = 0;
        var parentDiv = document.getElementById('image_list_div');

        for (i = 0; i < (event.target.files).length; i++) {
            if (filesToUpload.length ==5) {
                alert("Please upload only 5 image files.");
                return;
            }
            for (var j = 0; j < filesToUpload.length; j++) {
                if (filesToUpload[j].name == event.target.files[i].name) {
                    alert(event.target.files[i].name + " is already selected. Please choose other files.");
                    return;
                }
            }
            filesToUpload.push(event.target.files[i]);

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

            fileName.setAttribute('index', name);
            fileName.setAttribute('assoc-file', event.target.files[i].name);
            fileName.addEventListener("click", removeImage);

            close.setAttribute('index', name);      //set the index attribute of the "close" button to the id of the div
            close.setAttribute('assoc-file', event.target.files[i].name);
            close.addEventListener("click", removeImage, true);  //add onclick listener to the "close" button

            document.getElementById("show_uploaded_images").style.display = "block";    //initally hidden div, make it visible

            div.appendChild(img);
            div.appendChild(close);
            div.appendChild(fileName);

            // var jsElm = document.createElement("script");
            // // set the type attribute
            // jsElm.type = "application/javascript";
            // // make the script element load file
            // jsElm.src = "new-script.js";

            //add this tree to the "image_list_div" div
            parentDiv.appendChild(div);
            // document.body.appendChild(jsElm);
        }
        var jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = "new-script.js";
        // finally insert the element to the body element in order to load the script
        document.body.appendChild(jsElm);

    };
}

function ajax_file_upload() {
    var form_data = new FormData(document.getElementById("clothingForm"));
    console.log(form_data);
    var retEmail = getCookie("retailer_email");
    form_data.append("retailer_email", retEmail);
    for (var i = 0; i < filesToUpload.length; i++) {
        form_data.append("image_" + i.toString(), filesToUpload[i]);
    }
    let jsonObject = {};
    // Split the FormData object into key value pairs to make a JSON dictionary
    for (const [key, value] of form_data.entries()) {
        jsonObject[key] = value;
    }
    console.log(jsonObject);
    $.ajax({
        type: 'POST',
        url: 'http://3.128.23.111:5000/api/v1/create/product',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log('Success!');
        },
    });
}
