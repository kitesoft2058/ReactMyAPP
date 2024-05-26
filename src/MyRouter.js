import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Main'

const MyRouter= ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main></Main>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default MyRouter