import React, {Component} from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
class Stripes extends Component{
    state = { 
        stripes:[
            {
                background: '#98c5e9',
                left:   120,
                rotate: 25,
                delay: 0,
                top: -260,
            },
            {
                background: '#ffffff',
                left: 360,
                rotate: 25,
                delay: 200,
                top: -397,
            },
            {
                background: '#98c5e9',
                left: 600,
                rotate: 25,
                delay: 400,
                top: -498,  
            }
        ]
    };
    showStripes=()=>(
        this.state.stripes.map((stripe,i)=>(
             <Animate
                key={i}
                show ={true}
                start={{
                    background: '#ffffff',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0

                }}
                enter={{
                    background:[stripe.background],
                    opacity: [1],
                    top: [stripe.top],
                    timing: {delay: [stripe.delay], duration: 200, ease: easePolyOut},
                    rotate: [stripe.rotate],
                    left: [stripe.left],
                    events: {
                        end(){
                            console.log('animation finished')
                        }
                    }   
                }}
            >
                {({background, opacity, left, rotate, top})=>{
                    return(
                        <div
                            className='stripe'
                            style= {{    
                                background,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                            }} 
                        >
                        </div>
                    );
                }}
            </Animate>
        ))
        );

    render() {
        return(
            <div className='featured_stripes'>
                {this.showStripes()}
            </div>
        );
    }
}
export default Stripes;
