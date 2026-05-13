import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function Pop_up_test({message,Onclose,src}){
  const popupStyle = {
  position: 'fixed',
  top: '91%',
  left: '18%',
  transform: 'translate(-50%, -50%)',
  WebkitBackdropFilter: 'blur(24px)',
  padding: '20px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '7px',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  zIndex: 1000,
  width: '32%',
  height: '14%',
  background:"white"
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  zIndex: 999,
};


return (
  <div style={overlayStyle} className="div_cl animate__fadeInUp">
    <div style={popupStyle}>
      <div style={{ textAlign: "center" }}>
        <DotLottieReact
          src={src}
          style={{ width: "118px", height: "118px", margin: "auto", marginTop: "-16px" , marginLeft:"-1%"}}
          autoplay
          speed={1.5}
        ></DotLottieReact>
      </div>
      <p style={{
        textAlign: "center",
        color: "#06080F",
        fontWeight: "400",
        fontSize: "19px",
        fontFamily: "Poppins , sans-serif",
        letterSpacing: "0.3px",
        margin: 0,
        position: "absolute",
        top: "40%",
        left: "21%",
      }}>{message}</p>
    </div>
  </div>
);
}
export default Pop_up_test;