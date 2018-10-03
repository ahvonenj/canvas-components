var CanvasComponentsUtil = 
{ 
	debug: true
};

CanvasComponentsUtil.IsUndefinedNullOrEmpty = function(variable)
{
	if(typeof variable === 'undefined' ||
		variable === null ||
		variable === '')
	{
		return true;
	}

	return false;
}

CanvasComponentsUtil.IsComponent = function(possiblyComponent)
{
	return Object.getPrototypeOf(possiblyComponent.constructor).name === 'Component';
}

CanvasComponentsUtil.UUID = function()
{
	function s4() 
	{
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

CanvasComponentsUtil.Log = function(str)
{
	if(CanvasComponentsUtil.debug)
		console.log(str);
}

var CCUtil = CanvasComponentsUtil;