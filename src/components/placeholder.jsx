import React from 'react'


export default function Placeholder() {
    return (
        <div style={{backgroundColor:"#ffffff"}} class="card px-2" aria-hidden="true">
            <div style={{height:"300px"}} className='card-img-top placeholder-glow'>
            <span style={{height:"100%",width:'100%'}} class="placeholder col-12"></span>
            </div>
            
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                
                </div>
        </div>
    )
}