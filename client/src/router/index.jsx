import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Popups from '../pages/Tests/Popups'
import ModelPopup from '../pages/Tests/ModelPopup'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route index element={<Popups /> } />
                    <Route path='/model' element={<ModelPopup /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
