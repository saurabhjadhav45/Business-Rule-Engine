import {IIConProps} from '@common/interfaces';

export function CloseIcon({fill, width, height}: IIConProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        id='solid_times'
        data-name='solid times'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.033,88l4.549-4.549a1.43,1.43,0,0,0,0-2.022L14.57,80.419a1.43,1.43,0,0,0-2.022,0L8,84.967,3.451,80.419a1.43,1.43,0,0,0-2.022,0L.419,81.43a1.43,1.43,0,0,0,0,2.022L4.967,88,.419,92.549a1.43,1.43,0,0,0,0,2.022L1.43,95.581a1.43,1.43,0,0,0,2.022,0L8,91.033l4.549,4.549a1.43,1.43,0,0,0,2.022,0l1.011-1.011a1.43,1.43,0,0,0,0-2.022Z'
        transform='translate(0 -80)'
        fill={fill}
      />
    </svg>
  );
}

CloseIcon.defaultProps = {
  fill: '#000000',
  width: '12',
  height: '12',
};
