var whitelist = function(object, whitelist, shallow){
	shallow = shallow === undefined ? false : shallow;
	return objectReducer(object, whitelist, shallow);
}

function objectReducer(object, whitelist, shallow) {
	var keys = Object.keys(object);
	var reducedObject = keys.reduce(function(newObject, key) {
		if(whitelist.indexOf(key) !== -1) {
			if(valueIsObject(object[key]) && !shallow) {
				newObject[key] = objectReducer(object[key], whitelist, false);
			}
			else if(valueIsArray(object[key]) && !shallow) {
				newObject[key] = reduceArrayOfPotentialObjects(object[key], whitelist);
			}
			else {
				newObject[key] = object[key];
			}
		}
		return newObject;
	}, {});
	return reducedObject;
}

function valueIsObject(value) {
	return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function valueIsArray(value) {
	return Array.isArray(value);
}

function reduceArrayOfPotentialObjects(array, whitelist) {
	var newArray = array.map(function(item){
		var returnValue = null;
		if(valueIsObject(item)){
			returnValue = objectReducer(item, whitelist, false);
		}
		else if(valueIsArray(item)){
			returnValue = reduceArrayOfPotentialObjects(item, whitelist);
		}
		else {
			returnValue = item;
		}
		return returnValue;
	});
	return newArray;
}

module.exports = whitelist;