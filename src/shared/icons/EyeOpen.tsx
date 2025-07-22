import {IIConProps} from '@common/interfaces';

export function EyeOpen(props: IIConProps) {
  const {fill, width, height} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 10.667'>
      <path
        id='solid_eye'
        data-name='solid eye'
        d='M15.9,68.928A8.909,8.909,0,0,0,8,64,8.911,8.911,0,0,0,.1,68.928a.9.9,0,0,0,0,.811A8.909,8.909,0,0,0,8,74.667a8.911,8.911,0,0,0,7.9-4.928A.9.9,0,0,0,15.9,68.928ZM8,73.333a4,4,0,1,1,4-4A4,4,0,0,1,8,73.333Zm0-6.667a2.647,2.647,0,0,0-.7.105A1.329,1.329,0,0,1,5.439,68.63,2.661,2.661,0,1,0,8,66.667Z'
        transform='translate(-0.001 -64)'
        fill={fill}
      />
    </svg>
  );
}

EyeOpen.defaultProps = {
  width: '15',
  height: '15.5',
  fill: '#002662',
};
