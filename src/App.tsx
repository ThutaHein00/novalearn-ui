import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavbarComponent from "./Component/NavbarComponent";
import HomeComponent from "./Component/HomeComponent";
import LoginComponent from "./Component/LoginComponent";
import RegisterComponent from "./Component/RegisterComponent";
import AdminDashboard from "./Component/admin-dashboard/AdminDashboard";
import CourseDetails from "./Component/admin-dashboard/CourseDetails";
import CategoryEntry from "./Component/admin-dashboard/CategoryEntry";
import CourseEntry from "./Component/admin-dashboard/CourseEntry";
import LessonsEntry from "./Component/admin-dashboard/LessonsEntry";
import LessonEdit from "./Component/admin-dashboard/LessonEdit";
import CourseDetailsComponent from "./Component/CourseDetailsComponent";
import CartViewComponent from "./Component/CartViewComponent";
import EnrolledSuccessComponent from "./Component/EnrolledSuccessComponent";
import FooterComponent from "./Component/FooterComponent";
import CourseEdit from "./Component/admin-dashboard/CourseEdit";
import OwnPropertyComponent from "./Component/OwnPropertyComponent";
import LearnLessonComponent from "./Component/LearnLessonComponent";


export default function App() {

    return (
        <>
           <BrowserRouter>
               <NavbarComponent />
               <Routes>
                   <Route path="/" element={<HomeComponent />} />
                   <Route path="/login" element={<LoginComponent />} />
                   <Route path="/register" element={<RegisterComponent />} />
                   <Route path="/admin-dashboard" element={<AdminDashboard />}>
                       <Route path="" element={<CourseDetails />}  />
                       <Route path="category-entry" element={<CategoryEntry />} />
                       <Route path="course-entry" element={<CourseEntry />} />
                       <Route path="course-edit" element={<CourseEdit />} />
                       <Route path="lessons-entry/:id" element={<LessonsEntry />} />
                       <Route path="lesson-edit/:id" element={<LessonEdit />} />
                   </Route>
                   <Route path="/course/:id" element={<CourseDetailsComponent />} />
                   <Route path="/cart-view" element={<CartViewComponent />} />
                   <Route path="/enrolled-success" element={<EnrolledSuccessComponent />} />
                   <Route path="/own-property" element={<OwnPropertyComponent />} /> 
                   <Route path="/learn-lessons/course/:id" element={<LearnLessonComponent />} />
               </Routes>
               <FooterComponent />
           </BrowserRouter>
        </>
    );
}
