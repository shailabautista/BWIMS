import {Shimmer} from 'react-shimmer';

const ShimmerComponent = ({children}) => {
  return (
    <Shimmer className='w-100'>
      {children}
    </Shimmer>  
  )
}

export default ShimmerComponent