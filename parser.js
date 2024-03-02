function parseDefinitionToArray(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let regex2 = RegExp('code{([^}]+)}', 'g');
    let array1;
    let jsonArray = [];
    while ((array1 = regex1.exec(str)) !== null) {
        let array2;
        let frontside = array1[1];
        let backside = array1[2];
        while ((array2 = regex2.exec(frontside)) !== null) {
            frontside = frontside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        while ((array2 = regex2.exec(backside)) !== null) {
            backside = backside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        const jsonObject = {
            "front side" : frontside,
            "back side" : backside
        };
        jsonArray.push(jsonObject);
    }

    return jsonArray;
}

function parseDefinitionToObject(str) {
    let regex1 = RegExp('definition{(.+)}{(.+)}', 'g');
    let regex2 = RegExp('code{([^}]+)}', 'g');
    let array1;
    let jsonObject = {null : null};
    while ((array1 = regex1.exec(str)) !== null) {
        let array2;
        let frontside = array1[1];
        let backside = array1[2];
        while ((array2 = regex2.exec(frontside)) !== null) {
            frontside = frontside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        while ((array2 = regex2.exec(backside)) !== null) {
            backside = backside.replace(array2[0], 'textcolor{Thistle}{\\texttt{' + array2[1] + '}}')
        }
        jsonObject[frontside] = backside;
    }

    delete jsonObject[null];

    return jsonObject;
}
