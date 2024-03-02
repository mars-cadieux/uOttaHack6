function parseDefinition(str) {
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
