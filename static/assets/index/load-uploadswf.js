/**
 * Created with JetBrains WebStorm.
 * User: 松松
 * Date: 12-6-29
 * Time: 上午10:52
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    exports.init = function () {

        var settings = {
            flash_url:"/assets/swfupload/flash/swfupload.swf",
            upload_url:"/upload",
            post_params:{"random":Math.random()},
            file_size_limit:"9000 MB",
            file_types:"*.*",
            file_types_description:"All Files",
            file_upload_limit:100,
            file_queue_limit:0,
            button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,
            custom_settings:{
                progressTarget:"fsUploadProgress",
                cancelButtonId:"btnCancel"
            },
            debug:false,

            // Button settings
            //button_image_url:"images/TestImageNoText_65x29.png",
            button_width:"120",
            button_height:"30",
            button_placeholder_id:"upload-wrapper-trigger",

            // The event handler functions are defined in handlers.js
            file_queued_handler:fileQueued,
            file_queue_error_handler:fileQueueError,
            file_dialog_complete_handler:fileDialogComplete,
            upload_start_handler:uploadStart,
            upload_progress_handler:uploadProgress,
            upload_error_handler:uploadError,
            upload_success_handler:uploadSuccess,
            upload_complete_handler:uploadComplete,
            queue_complete_handler:queueComplete    // Queue plugin event

        };

        window.swfu = new SWFUpload(settings);

    };
});
