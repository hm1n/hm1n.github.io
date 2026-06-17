import React, { FunctionComponent, SVGProps } from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
import SearchIcon from './SearchIcon';

export type IconType = 'moon' | 'sun' | 'search';

const iconMap = {
  moon: MoonIcon,
  sun: SunIcon,
  search: SearchIcon,
} as const;

export type IconProps = SVGProps<SVGSVGElement> & {
  type: IconType;
};

const Icon: FunctionComponent<IconProps> = function ({ type, ...svgProps }) {
  const IconComponent = iconMap[type];
  return <IconComponent {...svgProps} />;
};

export default Icon;
