import { useParams } from "react-router-dom";

import DashboardLayout
from "../../layouts/DashboardLayout";


import {
getConfirmationById
}
from "../../services/confirmationService";


import ConfirmationReceipt
from "../../components/confirmation/ConfirmationReceipt";



const ConfirmationPage = () => {


const {id}=useParams();



const confirmation =
getConfirmationById(id);




return (

<DashboardLayout>


{
confirmation ?


<ConfirmationReceipt

confirmation={
confirmation
}

/>


:

<div
className="
bg-white
p-6
rounded-xl
"
>

Confirmation not found

</div>


}


</DashboardLayout>

);


};


export default ConfirmationPage;
