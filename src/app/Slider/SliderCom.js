import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material';
import Slider from "react-slick";
import WindowWidth from '../../Utilities';
import { useNavigate } from 'react-router-dom';

const SliderCom = ({ SliderData }) => {
    const base_url = process.env.REACT_APP_BASE_URL;
    const [state, setState] = useState({
        sliderOverall: [],
        baseUrl: base_url

    })
    const navigate = useNavigate()
    const { sliderOverall, baseUrl } = state;
    const settings = {
        // dots: true,
        // infinite: true,
        // speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 1500,
    };

    useEffect(() => {
        setState((state) => ({ ...state, sliderOverall: SliderData }))

    }, [SliderData])


    const sliderItemClick=(data)=>{
        if(data.navigate_category){
            navigate(`categoty/${data.navigate_category}`)
          }
    }
    const size = WindowWidth()

    return (
        <div>
            <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
                {
                    sliderOverall.length > 0 ?
                        <Slider {...settings}>
                            {sliderOverall.length > 0 && sliderOverall.map((item) => {
                                return (
                                    <div onClick={()=> sliderItemClick(item)}>
                                        <img src={size === "sm" ? item.sm_img :  item.lg_img} className='w-100'/>
                                    </div>
                                )
                            })
                            }
                        </Slider>
                        :
                        <div>
                            <div>
                                <Skeleton variant="rounded" animation="wave" width={"100%"} height={200} />
                            </div>

                        </div>
                }

            </div>

        </div>
    )
}

export default SliderCom
