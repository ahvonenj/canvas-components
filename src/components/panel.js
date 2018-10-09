class CCPanel extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 150,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, CanvasComponent.PANEL);
	}
}