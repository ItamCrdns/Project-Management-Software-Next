import stylesloader from '@/components/ripplebutton/ripplebutton.module.css'

const Loading: React.FunctionComponent = () => {
  return (
    <>
      <div className={stylesloader.loaderwrapper}>
        <span
          style={{
            borderTop: '2px solid black',
            width: '25px',
            height: '25px'
          }}
          className={stylesloader.loader}
        ></span>
      </div>
      <h1>Loading your user information. Please wait...</h1>
    </>
  )
}

export default Loading
