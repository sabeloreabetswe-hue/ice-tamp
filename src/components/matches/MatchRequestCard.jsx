const MatchRequestCard = ({
  match,
  onAccept,
  onReject
}) => {


return (

<div
className="
bg-white
rounded-2xl
shadow-lg
p-6
"
>


<h2
className="
text-xl
font-bold
text-[#2A3663]
"
>

{match.loadTitle}

</h2>


<div className="mt-4 space-y-2">

<p>
<strong>
Transporter:
</strong>{" "}
{match.transporterName}
</p>


<p>
<strong>
Route:
</strong>{" "}
{match.pickup}
{" → "}
{match.destination}
</p>


<p>
<strong>
Compatibility:
</strong>{" "}
{match.compatibility}%
</p>


</div>



<div className="
flex
gap-3
mt-6
">


<button

onClick={()=>
onAccept(match)
}

className="
px-5
py-2
rounded-xl
bg-green-600
text-white
"

>

Accept

</button>



<button

onClick={()=>
onReject(match)
}

className="
px-5
py-2
rounded-xl
bg-red-600
text-white
"

>

Reject

</button>


</div>


</div>

);

};


export default MatchRequestCard;
