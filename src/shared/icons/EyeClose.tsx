import {IIConProps} from '@common/interfaces';

export function EyeClose(props: IIConProps) {
  const {fill, width, height} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 11.608'>
      <g
        id='Group_9896'
        data-name='Group 9896'
        transform='translate(-872.548 -393)'>
        <path
          id='solid_eye'
          data-name='solid eye'
          d='M15.9,68.928A8.909,8.909,0,0,0,8,64,8.911,8.911,0,0,0,.1,68.928a.9.9,0,0,0,0,.811A8.909,8.909,0,0,0,8,74.667a8.911,8.911,0,0,0,7.9-4.928A.9.9,0,0,0,15.9,68.928ZM8,73.333a4,4,0,1,1,4-4A4,4,0,0,1,8,73.333Zm0-6.667a2.647,2.647,0,0,0-.7.105A1.329,1.329,0,0,1,5.439,68.63,2.661,2.661,0,1,0,8,66.667Z'
          transform='translate(872.548 329.1)'
          fill={fill}
        />
        <g
          id='Group_9873'
          data-name='Group 9873'
          transform='matrix(0.819, 0.574, -0.574, 0.819, 1510.726, -1257.631)'>
          <rect
            id='Rectangle_11415'
            data-name='Rectangle 11415'
            width='2.518'
            height='12.123'
            transform='translate(433.203 1712)'
            fill='#fff'
          />
          <rect
            id='Rectangle_11416'
            data-name='Rectangle 11416'
            width='1.518'
            height='12.123'
            transform='translate(432.797 1712)'
            fill={fill}
          />
        </g>
      </g>
    </svg>
  );
}

EyeClose.defaultProps = {
  width: '15',
  height: '15.5',
  fill: '#002662',
};
