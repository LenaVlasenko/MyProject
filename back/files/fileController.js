

exports.uploadFile = async function (request, response) {
    console.log(request.files)
    if (request.files) {
        let fileData = request.files.fileData
        let uploadFileDir = './public/store/files/' + fileData.name
        await fileData.mv(uploadFileDir) // переместить файл
    }

    return response.sendStatus(204);
}