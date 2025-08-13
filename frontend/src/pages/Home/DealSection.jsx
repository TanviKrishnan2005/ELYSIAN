import React from 'react'
import dealsImg from "../../assets/deals.png"
const DealSection = () => {
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealsImg} alt="" />
        </div>

        <div className='deals__content'>
            <h5>GET UP TO 20% OFF</h5>
            <h4> Monthly Highlights</h4>
            <p>We’ve gathered the best deals, hottest styles, and can’t 
                miss savings all waiting for you this month.</p>

                <div className='deals__countdown flex-wrap'>
                    <div className="deals__countdown__card">
                        <h4>14</h4>
                        <p>Days</p>
                    </div>

                    <div className="deals__countdown__card">
                        <h4>20</h4>
                        <p>Hours</p>
                    </div>

                    <div className="deals__countdown__card">
                        <h4>15</h4>
                        <p>Mins</p>
                    </div>

                    <div className="deals__countdown__card">
                        <h4>05</h4>
                        <p>Secs</p>
                    </div>

                </div>
        </div>
    </section>
  )
}

export default DealSection