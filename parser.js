function parseDefinitionToArray(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonArray = [];
    while ((array1 = regex1.exec(str)) !== null) {
        const jsonObject = {
            "front side" : array1[1],
            "back side" : array1[2]
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let array1;
    let jsonObject = {null : null};
    while ((array1 = regex1.exec(str)) !== null) {
        jsonObject[array1[1]] = array1[2];
    }

    delete jsonObject[null];

    return jsonObject;
}
