import Image from "next/image"
import "./../../styles/component/register/register.css"
export default function register(){
    return(
        <div className="w-35">
            <Image
                src="/Logo/nexa.png"
                alt="nexa-logo"
                width={240}
                height={140}
            />
        </div>  
    )
}