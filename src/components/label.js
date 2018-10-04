class CCLabel extends Component
{
	constructor(
	{ 
		width = 150, 
		height = 35,
		x = 0,
		y = 0,
		z = 0,

		borderWidth = 0,
		borderColor = '#000',

		fontSize = 8,
		fontColor = '#000',

		backgroundColor = '#FFF'
	} = {}, ctx)
	{
		var options =
		{ 
			width: width, 
			height: height,
			x: x,
			y: y,
			z: z,

			borderWidth: borderWidth,
			borderColor: borderColor,

			fontSize: fontSize,
			fontColor: fontColor,

			backgroundColor: backgroundColor
		}

		super(options, ctx, CanvasComponent.LABEL);
	}
}