// Included styles;
import './Icon.scss';


type Units = 'px' | 'vh' | 'vw';
type Colors = 'white' | 'gray' | 'black' | 'accent' | 'error' | string;

interface ComponentProps {
	name: string;
	size: number;
	unit: Units;
	color?: Colors;
}

const Icon = ({ name, size, unit, color }: ComponentProps): JSX.Element => {
   return (
      <div className="icon">
         <img className={`icon__image ${color}`} src={`/ui-icons/${name}.svg`} alt={name} style={{ width: size + unit }} />
      </div>
   )
}

export default Icon;