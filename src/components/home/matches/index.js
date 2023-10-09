import React from 'react';
import { Tag } from '../../ui/misc'
import Blocks from './block';
const MatchesHome =()=>{
    return(
        <div className='home_matches_wrapper'>
            <div className='container'>
                <Tag
                    color = '#ffffff'   
                    size = '50px'
                    bck = '#0e1731'
                
                >
                    Matches

                </Tag>
                   
             
           <Blocks/>
                
                <Tag
                    color = '#0e1731'
                    size = '22px'
                    bck = '#ffffff'
                    link = {true}
                    linkTo= '/the_team'
                >
                    See matches
                </Tag>
            </div>
            
        </div>
    )
};
export default MatchesHome