import React from 'react'

function moveElement(array,initialIndex,finalIndex) {
	array.splice(finalIndex,0,array.splice(initialIndex,1)[0])
	console.log(array);
	return array;
        }

export default moveElement()