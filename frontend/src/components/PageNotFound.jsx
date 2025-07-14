const PageNotFound = ()=>{
    return(
        <div className={`flex flex-col justify-start items-center w-full h-screen pt-32`}>
            <img className="opacity-60 mix-blend-normal mb-5" src="https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-error-404-page-not-found-website-png-image_3545448.jpg"/>
            <h1>Looks like you are offtrack!!</h1>
            <br/>
            <h1>Requested page not found</h1>
        </div>
    )
}

export default PageNotFound