var fileobj;
function upload_file(e) {
    e.preventDefault();
    ajax_file_upload(e.dataTransfer.files);
}

function file_explorer() {
    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function () {
        files = document.getElementById('selectfile').files;
        ajax_file_upload(files);
        var image = document.getElementById('output');
        console.log((event.target.files).length);
        var i=0;
        var parentDiv = document.getElementById('image_list_div');

        for(i=0; i<(event.target.files).length; i++){
            var img = document.createElement('img');
            img.style.width = "85px";
            img.style.height = "70px";
            img.style.margin = "5px";
            img.style.borderRadius = "50px";
            img.style.webkitBoxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 1)";
            img.style.boxShadow = "2px 2px 5px 0px rgba(0, 0, 0, 1)";
            img.src = URL.createObjectURL(event.target.files[i]);
            parentDiv.appendChild(img);     
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