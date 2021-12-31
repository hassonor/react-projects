import React from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header />

      <div
        className="introduction flex-with-center"
        style={{ backgroundImage: `url('./introbg.svg')` }}
      >
        <div>
          <h1 data-aos='fade-up'>OR HASSON</h1>

          <div className="intro-content d-flex justify-content-between">
            <p>
              Full Stack Developer <br /> Automation Infrastructure Engineer
            </p>
              <button className="primary-button font-bold"><a href="#carousel">Get Started</a></button>
          </div>
        </div>
      </div>

      <Carousel />

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#001220"
            fill-opacity="1"
            d="M0,224L21.8,197.3C43.6,171,87,117,131,101.3C174.5,85,218,107,262,144C305.5,181,349,235,393,240C436.4,245,480,203,524,160C567.3,117,611,75,655,64C698.2,53,742,75,785,96C829.1,117,873,139,916,176C960,213,1004,267,1047,240C1090.9,213,1135,107,1178,85.3C1221.8,64,1265,128,1309,176C1352.7,224,1396,256,1418,272L1440,288L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container">
        <div className="row justify-content-start">
          <div className="col-md-4">
            <div className="n-box2 p-5 font-bold" data-aos='fade-right'>
              <h1>First, solve the problem.</h1>
              <br />
              <p>Then, write the code</p>
            </div>
          </div>
        </div>

        <div className="row pt-5 justify-content-center">
          <div className="col-md-4">
            <div>
              <img src="./jsbuff.svg" alt="" height="200" className="w-100" data-aos='fade-up'/>
            </div>
          </div>
        </div>

        <div className="row pt-5 justify-content-end">
          <div className="col-md-4">
            <div className="n-box2 p-5 font-bold" data-aos='fade-left'>
              <p>
                  “Any fool can write code that a computer can understand.
                  Good programmers write code that humans can understand.”
                  – Martin Fowler
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="devstack container my-5 n-box2 py-5">
        <div className="text-center">
          <h3 className="font-bold text-center">My Development Stack</h3>

          <hr />

          <img
            src="./developer.svg"
            alt=""
            height="200"
            width="200"
            className="text-center"
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className='font-bold'>
              <h3 className="font-bold">Front End</h3>
              <hr />
                <p>Javascript</p>
              <p>HTML</p>
              <p>React</p>
              <p>Angular</p>
                <p>Redux</p>
                <p>Context API</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className='font-bold text-center'>
              <h3 className="font-bold">UI/Styling</h3>
              <hr />
              <p>Tailwind CSS</p>
              <p>Material UI</p>
              <p>Bootstrap</p>
                <p>CSS3</p>
              <p>AntDesign</p>
              <p>Semantic UI</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className='font-bold text-end'>
              <h3 className="font-bold">Backend/DB</h3>
              <hr />
              <p>Node JS</p>
              <p>Express</p>
              <p>JAVA</p>
              <p>SQL</p>
                <p>NoSQL</p>
            </div>
          </div>
        </div>
      </div>


      <div>
      <h3 className='font-bold text-center'>Who is Or Hasson</h3>
      <div className="who-is-or-hasson flex-with-center" style={{backgroundImage:`url('/whoisorhasson.svg')`}}>
         
         <div>
             <h3>Info About Or Hasson</h3>
             <hr />
             <p><pre>{JSON.stringify({
                 name:"Or Hasson" ,
                 from : "Israel" ,
                 age: "Forever young :)",
                 gender:"Male"
             } , null , 2)}</pre></p>
         </div>

      </div>
      </div>

    

    </div>
  );
}

export default Home;
