function parseDefinitionToArray(str) {
    let regex = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonArray = [];
    while ((array1 = regex.exec(str)) !== null) {
        const jsonObject = {
            "title" : array1[1],
            "definition" : array1[2]
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonObject = {null : null};
    while ((array1 = regex.exec(str)) !== null) {
        jsonObject[array1[1]] = array1[2];
    }

    delete jsonObject[null];

    return jsonObject;
}
