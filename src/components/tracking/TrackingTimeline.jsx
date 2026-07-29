const TrackingTimeline=({
history=[]
})=>{


return(

<div className="mt-6">


<h2 className="
font-bold
text-xl
">

Shipment Tracking

</h2>


{
history.map(
(item,index)=>(


<div

key={index}

className="
bg-[#D8DBBD]
p-4
rounded-xl
mt-3
"

>

<p className="font-bold">

{item.status}

</p>


<p>

{
new Date(
item.time
).toLocaleString()

}

</p>


</div>


)

)

}


</div>


);


};


export default TrackingTimeline;
