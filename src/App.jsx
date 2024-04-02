import { useState , useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading ] = useState(true)
  const [error, setError] = useState(null);

  let baseURL = ' https://api.escuelajs.co/api/v1'



  useEffect(() => {
    fetch(`${baseURL}/products`)
      .then(res => res.json())
      .then(json =>  {
        setProducts(json)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, []);



  function imageLink(URL){
    let url = String(URL.replace("]","").replace("[","").replace('"','').replace('"',''))
    console.log(url)
    return url
  }



  return (
    <>
      <div className='container mx-auto p-8 border my-4 rounded-[7px]'>
        <h1 className='text-start text-[28px] font-bold'>Products</h1>




      {
        loading ? <h1 className="text-center my-5 ">Loading...</h1> :

        <div className='grid grid-cols-4 mt-[40px] gap-8'>
        { 
          products.map((item) => {
            return <div key={item.id} className='card shadow-lg border rounded-[8px] w-[300px]'>
              <img src={imageLink(item.images[0])} alt={item.title} className='rounded-[8px]'/>
              <div className="p-3">
                <h2 className='text-lg'>{item.title.substring(0, 20)}</h2>
                <p className='text-gray-800 text-lg mt-[8px]'>
                  {item.description.substring(0, 20)}
                </p>
                <h3 className='text-lg mt-[8px] '>${item.price}</h3>
              </div>
            </div>
          })
        }
        </div>
      }


      {
        error ? (
          <div>
            <h1 className="text-center my-5 ">Error</h1>
          </div>
          ) : (          
            ""
        )}

      </div>
    </>
  )
}

export default App
