import { PropagateLoader } from "react-spinners"


const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <PropagateLoader  color='black' />
    </div>
  )
}

export default LoadingSpinner
