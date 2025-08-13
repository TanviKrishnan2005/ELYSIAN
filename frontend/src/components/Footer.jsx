import React from 'react'

const Footer = () => {
  return (
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>Contact info</h4>
            <p>
                <span>
                    <i className='ri-map-pin-2-fill'></i>
                </span>
                123, New Delhi 
            </p>
            <p>
                <span>
                    <i className='ri-mail-fill'></i>
                </span>
                Elysian@gmail.com
            </p>
            <p>
                <span>
                    <i className='ri-phone-fill'></i>
                    +91 78645687973
                </span>
            </p>
        </div>

    </footer>
  )
}

export default Footer