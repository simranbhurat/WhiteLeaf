<?php
foreach($_FILES['file']['name'] as $key=>$val){
    $file_name = $_FILES['file']['name'][$key];
 
    // get file extension
    $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
 
    // get filename without extension
    $filenamewithoutextension = pathinfo($file_name, PATHINFO_FILENAME);
 
    if (!file_exists(getcwd(). '/uploads')) {
        mkdir(getcwd(). '/uploads', 0777);
    }
 
    $filename_to_store = $filenamewithoutextension. '_' .uniqid(). '.' .$ext;
    move_uploaded_file($_FILES['file']['tmp_name'][$key], getcwd(). '/uploads/'.$filename_to_store);
}
echo "File(s) uploaded successfully";
die;