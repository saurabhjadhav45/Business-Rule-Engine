import {useEffect} from 'react';

interface IHelmet {
  title: string;
}

function Helmet(props: IHelmet) {
  const {title} = props;
  useEffect(() => {
    document.title = `${title} | Project`;
  }, [title]);

  return null;
}

export default Helmet;
