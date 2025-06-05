interface Props {
    action: () => void,
    text: string,
    icon: string,
    isOnLoad: boolean
}

function ActionButton({action, text, icon, isOnLoad} : Props) {
    return (
        <button className={`h-fit bg-primary px-4 py-2 rounded-md text-white relative flex justify-center cursor-pointer hover:bg-[#AF0009] transition-all`} onClick={action} disabled={isOnLoad}>
            <div className={`${isOnLoad ? "opacity-0" : "opacity-100"} flex flex-row place-items-center ${text !== "" && icon !== "" ? "space-x-2" : ""}`}>
                <i className={`${icon} text-xl`} />
                <span className={`font-medium`}>{text}</span>
            </div>
            <i className={`${isOnLoad ? "opacity-100" : "opacity-0"} ri-loader-line animate-spin text-xl origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}/>
        </button>
    )
}

export default ActionButton