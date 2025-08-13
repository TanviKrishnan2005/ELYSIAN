import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span>
                <i className='ri-truck-line'></i>
                <h4>FREE DELIVERY</h4>
                <p>Straight to your doorstep 
                    because good deals deserve a smooth ride home.</p>
            </span>
        </div>

        <div className='banner__card'>
            <span>
                <i className='ri-money-dollar-circle-line'></i>
                <h4>RETURN POLICY</h4>
                <p>Easy 10 days return and refund policy</p>
            </span>
        </div>

        <div className='banner__card'>
            <span>
                <i className='ri-user-voice-fill'></i>
                <h4>STRONG SUPPORT</h4>
                <p>Offer customer support services to assis customers with issues</p>
            </span>
        </div>

    </section>
  )
}

export default PromoBanner