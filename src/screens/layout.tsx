import { Link } from "react-router"

function Layout() {
    return(
        <div className={`w-full flex justify-center`}>
            <div className={`max-w-[1620px] max-h-[1040px] h-full w-full bg-background flex flex-col`}>
                {/* Header */}
                <div className={`w-full min-h-14 h-14 bg-accent border-b-1 border-greyist px-6 lg:px-20 z-10 flex justify-between items-center`}>
                    <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
                </div>

                {/* Content */}
                <div className={`w-full h-full flex flex-row`}>
                    <div className={`min-w-fit w-fit flex flex-col`}>
                        <Link to="/" className={`flex flex-row`}>
                            <i className={`ri-home-2-line`}/>
                            <span>Home</span>
                        </Link>
                        <Link to="/" className={`flex flex-row`}>
                            <i className={`ri-home-2-line`}/>
                            <span></span>
                        </Link>
                    </div>
                    <div className={`w-full`}>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Layout