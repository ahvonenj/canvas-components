var CanvasComponentsUtil = { };

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

var CCUtil = CanvasComponentsUtil;