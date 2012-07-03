function fileQueued(file) {
    try {
        //console.log('队列中', file, this.customSettings.progressTarget);
        console.log('fileQueued', file, this.customSettings.progressTarget)
    } catch (ex) {
        this.debug(ex);
    }

}

function fileQueueError(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
            return;
        }


        //console.log('队列错误', file, this.customSettings.progressTarget);

        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                console.log("这个文件太大了");
                this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                //console.log("Cannot upload Zero Byte files.");
                console.log("不能上传0字节的文件");
                this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                //console.log("Invalid File Type.");
                console.log("不允许上传此文件");
                this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            default:
                if (file !== null) {
                    //console.log("Unhandled Error");
                }
                this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    try {
        if (numFilesSelected > 0) {
            document.getElementById(this.customSettings.cancelButtonId).disabled = false;
        }
        console.log("文件对话框已经关闭，开始上传");
        //this.startUpload();
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadStart(file) {
    try {
        console.log('开始上传', file);
    }
    catch (ex) {
    }

    return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        console.log(percent);

        //console.log('Uploading', file, this.customSettings.progressTarget);
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    try {

        //console.log('Complete', file, this.customSettings.progressTarget);

    } catch (ex) {
        this.debug(ex);
    }
}

function uploadError(file, errorCode, message) {
    try {

        //console.log('Upload Error', file, this.customSettings.progressTarget);
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                //console.log("Upload Error: " + message);
                this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                //console.log("Upload Failed.");
                this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                //console.log("Server (IO) Error");
                this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                //console.log("Security Error");
                this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                //console.log("Upload limit exceeded.");
                this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                //console.log("Failed Validation.  Upload skipped.");
                this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                // If there aren't any files left (they were all cancelled) disable the cancel button
                if (this.getStats().files_queued === 0) {
                    document.getElementById(this.customSettings.cancelButtonId).disabled = true;
                }
                //console.log("Cancelled");
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                //console.log("Stopped");
                break;
            default:
                //console.log("Unhandled Error: " + errorCode);
                this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    if (this.getStats().files_queued === 0) {
        document.getElementById(this.customSettings.cancelButtonId).disabled = true;
    }
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
    var status = document.getElementById("divStatus");
    status.innerHTML = numFilesUploaded + " file" + (numFilesUploaded === 1 ? "" : "s") + " uploaded.";
}