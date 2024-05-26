//1. 초기 state
const initState= { items : [
    {no:1, title:'Hello', memo:'This is first memo', photos:[], date:'2024.05.27', position:{lat:37.56173502710597, lng:127.0342972384233}},
    {no:2, title:'Good', memo:'This is second memo', photos:[], date:'2024.05.28', position:{lat:37.56190140184039, lng:127.035347088087}},
]}

//37.56173502710597,127.0342972384233  -- 미래IT캠퍼스 
//37.56190140184039,127.035347088087  --- 왕십리119

//2. action 
//2.1 type만 있는 action 객체 작성.
//const setItemsAction= {type:'item/setItems'}
//2.2 type과 고정된 데이터값 까지 가진 actoin
//const setItemsAction= {type:'item/setItems', items:[{},{}]}
//2.3 데이터를 전달받아 데이터로 설정되는 action object 생성 함수
export const setItemsAction= (items)=>{
    return {type:'item/setItems', items: items}
}
//2.4 아이템 1개를 추가하는 기능 액션생성함수
export const addItemAction= item=> {return {type:'item/addItem', item}}
//2.5 아이템 1개를 삭제하는 기능 액션생성함수
export const removeItemAction= item=>{return {type:'item/addItem', item}}
//2.6 아이템 1개를 수정하는 기능 액션생성함수
export const modifyItemAction= item=>{return {type:'item/modifyItem', item}}


//3. reducer
export default function itemsReducer(state= initState, action){
    switch(action.type){
        case 'item/setItems':
            return { ...state, items: action.items} //action 객체에 전달된 items 값으로 새로운 state 설정
        case 'item/addItem':
            return { ...state, items: state.items.concat(action.item)} //action 객체에 전달된 item 1개를 기존 state에 추가하여 새로운 state객체로 리턴
        case 'item/removeItem':
            return { ...state, items: state.items.filter(item=>item.no != action.item.no)} // 기존 배열의 item.no 중 action객체에 전달된 item의 no와 같지 않은 요소만 필더하여 새로운 객체로 리턴. 결국 전달받은 item만 제거됨
        //아이템 1개를 수정하는 기능...
        
        default:
            return state         
    }
}

// 리듀서를 store에 등록하기 위해 RootReducer만들고 등록
