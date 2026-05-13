import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function Success_login({message,Onclose,src}){
  const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  padding: '20px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '24px',
  boxShadow: '0 8px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08) inset',
  zIndex: 1000,
  width: '19%',
  height: '41%',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  zIndex: 999,
};

return (
  <div style={overlayStyle}>
    <div style={popupStyle}>
      <div style={{ textAlign: "center" }}>
        <DotLottieReact
          src={src}
          style={{ width: "300px", height: "300px", margin: "auto", marginTop: "-21px" }}
          autoplay
          speed={1.5}
        ></DotLottieReact>
      </div>
      <p style={{
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "15px",
        letterSpacing: "0.3px",
        textShadow: "0 1px 8px rgba(0,0,0,0.3)",
        margin: 0,
      }}>{message}</p>
    </div>
  </div>
);
}
export default Success_login;