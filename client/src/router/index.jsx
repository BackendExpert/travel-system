import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Popups from '../pages/Tests/Popups'
import ModelPopup from '../pages/Tests/ModelPopup'
import FormTest from '../pages/Tests/FormTest'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route index element={<FormTest /> } />
                    <Route path='/model' element={<ModelPopup /> } />
                    <Route path='notifications' element={<Popups /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
