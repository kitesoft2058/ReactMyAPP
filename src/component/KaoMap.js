import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// 0) kakao developers site application 등록.
//  [1] [내 애플리케이션] - 애플리케이션 추가하기.
//  [2] 플랫폼 등록 [ Web ] 
//      * 개발모드 : http://localhost:3000      [http:// 이기에 local에서도 구동됨]
//      * 배포모드 : http://mrhi.dothome.co.kr ~~

//  [3] index.html 에 JavaScript 라이브러리 추가 <script src="//dapi.kakao.com/v2/maps/~~~~  >
//  [4] 지도화면을 그려내는 <div id='map'> 및 불러오는 코드 작성.



// 3) <script>로 kakao map api 를 심어서 가져오면 window 전역 객체에 들어가게 됨.
// 함수형 컴포넌트에서는 window 최상위 객체의 멤버를 곧바로 사용할 수 없어서. 
// window 객체안에 있는 kakao 객체를 뽑아서 사용해야함. 구조분해할당
const { kakao } = window

const KaoMap= (props)=>{

    //미래IT캠퍼스 : 37.56173502710597,127.0342972384233

    //(실습2) 리덕스를 이용해 클릭한 곳에 아이템 추가 및 마커표시 - 일단, 리덕스의 구현 및 동작 테스트를 위해 item.js[state, action, reducer] 제작 및 사용해보기
    const items= useSelector(state=>state.itemsReducer.items)
    const dispatch= useDispatch()

    //2) div 요소가 그려진 후 kakao 지도를 불러와야 하기에 반드시 useEffect()에서 수행. 
    useEffect( ()=>{
        const container= document.getElementById('map')
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.56173502710597,127.0342972384233), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        

        // -------------------------------------------
        console.log('아이템개수:' + items.length)
        for( const item of items ){

            // 마커 이미지의 이미지 주소입니다
            //var imageSrc = item.photos[0]
            // 마커 이미지의 이미지 크기 입니다
            //var imageSize = new kakao.maps.Size(24, 35);             
            // 마커 이미지를 생성합니다    
            //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            //각 item에 저장된 좌표값으로 마커좌표객체 생성
            const latlng= new kakao.maps.LatLng(item.position.lat, item.position.lng)
            
            // 지도를 클릭한 위치에 표출할 마커입니다
            var marker= new kakao.maps.Marker({
                position: latlng, //마커의 자표 
                title: item.title // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다 
                
                //마커 이미지 
            })

            // 지도에 마커를 표시합니다
            marker.setMap(map)

            //각각의 마커들에 리스너 등록 - 일단, 단순하게 다이얼로그 보여주기. [기존 아이템을 보여주는 방법은 다이얼로그?]
            kakao.maps.event.addListener(marker,'click', ()=>{alert(item.title+"\n"+item.memo)})
        }

        // 새로운 아이템 클릭
        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent){
            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng; 
            console.log(latlng.getLat() +","+latlng.getLng())

            // 마커 위치를 클릭한 위치로 옮깁니다
            var marker= new kakao.maps.Marker({
                position: latlng,
            })

            // 지도에 마커를 표시합니다
            marker.setMap(map)

            //bottom sheet show..
            props.showBottomSheet(latlng.getLat(), latlng.getLng())

            //지도를 클릭한 위치로 이동
            map.panTo(latlng)
            
        })
        //-------------------------------------------

    },[])

    return (
        //1) 카카오 지도가 그려질 영역
        <div id="map" style={{width:'100vw', height:'100vh'}}></div>
    )
}
export default KaoMap