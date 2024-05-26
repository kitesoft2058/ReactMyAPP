import KaoMap from "./component/KaoMap"
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'

const Main= ()=>{

    const controls= useAnimation()

    const showBottomSheet= ()=>{
        controls.start('open')
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
`

// bottom sheet handle
const BottomSheetHandle = styled.div`
    width: 60px;
    height: 8px;
    border-radius: 4px;
    background-color: silver;
    margin: 16px auto;
`