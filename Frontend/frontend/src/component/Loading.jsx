import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function Loading(){
    return(
        <div className="divloading">
            <DotLottieReact
              src={"https://lottie.host/a40e2bac-1c4d-4030-bb1f-1b83b966a9f9/nZV2hzvkln.lottie"}
              style={{ width: "300px", height: "300px", margin: "auto", marginTop: "-21px" }}
              autoplay
              loop
              speed={1.5}
            ></DotLottieReact>
        </div>
    )
}
export default Loading;