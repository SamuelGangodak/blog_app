import { Outlet , Link} from 'react-router-dom'


const Layout = () => {

  const menu=[
    {text: "Nature", path: "/"},
    {text: "Technology", path: "/"},
    {text: "Travel", path: "/"},
    {text: "Politics", path: "/"}
]
  const data={title:"", image:"", post:"<p><br></p>", category:""}

  return (
    <div>
        {/* <Header/> */}
        <div className="border-b">
            <div className=" w-full p-5 flex justify-between flex-wrap">
                <Link to="/" >
                  <span className='font-extrabold text-2xl'>BLOGGER</span>
                </Link>
                <div className="flex flex-wrap">
                    <ul className='flex flex-wrap'>
                        {menu.map((x, index)=>{
                            return <li key={index}><Link className='p-2 flex items-center justify-center' to={`/?category=${x.text}`}><span>{x.text}</span></Link></li>
                        })}
                    </ul>
                    <button className='bg-slate-500 text-white px-2 py-1 rounded'>
                        <Link to='./create' state={data}>+ New Post</Link>
                    </button>
                </div>
            </div>
        </div>
        {/* <Body/> */}
      <div className='flex justify-center mx-auto px-5 md:px-20'>
        <div className='m-5 min-h-[600px] w-full'>
          <Outlet></Outlet>
        </div>
      </div>
      {/* <Footer/> */}
      <div className="footer flex bg-slate-800 ">
        <div className="flex mx-auto py-10 items-center justify-center">
            <h3 className='text-gray-400'>BLOGGER</h3>
        </div>
      </div>
    </div>
  )
}

export default Layout
