interface Props {
    action: () => void,
    text: string,
    icon: string,
    isOnLoad: boolean,
    bgColor?: string,
    hoverbgColor?: string,
    borderColor?: string,
    hoverBorderColor?: string
    textColor?: string,
    hoverTextColor?: string
}

function ActionButton({action, text, icon, isOnLoad, 
    bgColor = "bg-primary", hoverbgColor = "hover:bg-[#AF0009]", 
    borderColor = "border-primary", hoverBorderColor = "hover:border-[#AF0009]", 
    textColor = "text-white", hoverTextColor = "hover:text-white"} : Props) {

    const buttonStyle = `${bgColor} ${hoverbgColor} ${borderColor} ${hoverBorderColor} ${textColor} ${hoverTextColor}`

    return (
        // button default color is red
        <button className={`h-fit px-4 py-2 rounded-md relative flex justify-center cursor-pointer transition-all ${buttonStyle}`} onClick={action} disabled={isOnLoad}>
            <div className={`${isOnLoad ? "opacity-0" : "opacity-100"} flex flex-row place-items-center ${text !== "" && icon !== "" ? "space-x-2" : ""}`}>
                <i className={`${icon} text-xl`} />
                <span className={`font-medium`}>{text}</span>
            </div>
            <i className={`${isOnLoad ? "opacity-100" : "opacity-0"} ri-loader-line animate-spin text-xl origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}/>
        </button>
    )
}

export default ActionButton