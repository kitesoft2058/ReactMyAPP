import KaoMap from "./component/KaoMap"
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemAction, setItemsAction } from "./redux/item"

const Main= ()=>{

    const controls= useAnimation()

    let latitude=0
    let longitude=0

    const showBottomSheet= (lat,lng)=>{
        latitude= lat
        longitude= lng
        controls.start('open')
    }

    const aa=new Array(10).fill().map((v,i)=>i+1)

    const items= useSelector( state=>state.itemsReducer.items )
    const dispatch= useDispatch()

    const titleRef= useRef()
    const memoRef=useRef()
    const clickSave=()=>{
        const title= titleRef.current.value
        const memo= memoRef.current.value
        const item= {
            no: items.lenght+1,
            title,
            memo,
            photos:[],
            date: '2024.05.30',
            position: {lat:latitude, lng:longitude}
        }
        dispatch( addItemAction(item) )

        controls.start('close')
    }

    return (
        <div>
            {/*(실습1) 카카오 지도를 보여주는 컴포넌트 */}
            <KaoMap showBottomSheet={showBottomSheet}></KaoMap>

            {/* bottom sheet ~ framer motion library */}
            <BottomSheet
                variants={{
                    close:{y:'100%'},
                    open:{y:0}
                }}
                initial='close'
                animate={controls}

                drag='y'
                dragConstraints={{top:0}}
                >
                
                <BottomSheetHandle></BottomSheetHandle>

                <BottomSheetContent>
                    <div className="text">
                        <input placeholder="title" ref={titleRef}></input>
                        <textarea placeholder="memo" ref={memoRef}></textarea>
                    </div>

                    <div className="photos">
                        {
                           aa.map(v=><div>{v}</div>) 
                        }
                    </div>

                    <div className="buttons">
                        <button onClick={clickSave}>작성완료</button>
                    </div>

                </BottomSheetContent>

                
            </BottomSheet>


        </div>
    )
}
export default Main

// bottom sheet 
const BottomSheet = styled(motion.div)`
    position: fixed;
    height: 100vh;
    top:50vh;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 10;
    box-shadow: 0 0 10px gray;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 8px;
    width: 96%;
    margin: 0 auto;
`

// bottom sheet handle
const BottomSheetHandle = styled.div`
    width: 60px;
    height: 8px;
    border-radius: 4px;
    background-color: silver;
    margin: 8px auto;
`

// bottom sheet content
const BottomSheetContent= styled.div`
    width: 100%;
    height: 42vh;
    //border: 1px dotted black;
    box-sizing: border-box;
    padding: 16px;
    overflow-y: scroll;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;


    .text{
        width: 45%;  
        height: 200px;
        //border: 1px dotted red;
        display: flex;
        flex-direction: column;

        input{
            width: 100%;
            box-sizing: border-box;
            padding: 0.5rem;
            margin-bottom: 8px;
        }

        textarea{
            width: 100%;
            box-sizing: border-box;
            padding: 0.5rem;
            resize: none;
            flex: 1;
        }
    }

    .photos{
        width: 45%;
        //border: 1px dotted blue;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

    }

    .buttons{
        width: 100%;
        margin-top: 8px;
        //border: 1px dotted green;

        button{
            width: 100%;
            padding: 0.8rem;
            background-color: lightblue;
            border: 1px solid black;
            border-radius: 4px;
            box-shadow: 0 3px 5px silver;
        }
    }
    

`