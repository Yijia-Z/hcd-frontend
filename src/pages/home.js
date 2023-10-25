import "./home.css"

const image = require("../images/books.png")

function Home() {
  
  return(
    <main> 
      <img src={image} alt="img"/>
      <h1 className='homeType'>
              Welcome to Material Master
      </h1>
      <h1 className='descp'>
        For all of your course material needs
      </h1>
    </main>
  );
    
}

export default Home;