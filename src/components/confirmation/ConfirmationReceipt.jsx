const ConfirmationReceipt = ({
  confirmation
}) => {


return (

<div
className="
bg-white
rounded-2xl
shadow-lg
p-8
"
>


<h2
className="
text-2xl
font-bold
text-[#2A3663]
mb-6
"
>

TAMP Digital Confirmation

</h2>



<div className="space-y-3">


<p>

<strong>
Contract ID:
</strong>{" "}

{confirmation.contractId}

</p>




<p>

<strong>
Match ID:
</strong>{" "}

{confirmation.matchId}

</p>




<p>

<strong>
Shipment:
</strong>{" "}

{confirmation.route}

</p>




<p>

<strong>
Freight Owner:
</strong>{" "}

{confirmation.freightOwner}

</p>




<p>

<strong>
Transporter:
</strong>{" "}

{confirmation.transporter}

</p>




<p>

<strong>
Decision:
</strong>{" "}

<span
className="
text-green-600
font-bold
"
>

{confirmation.decision}

</span>

</p>




<p>

<strong>
Confirmed:
</strong>{" "}

{
new Date(
confirmation.createdAt
)
.toLocaleString()

}

</p>



</div>



</div>

);


};


export default ConfirmationReceipt;
