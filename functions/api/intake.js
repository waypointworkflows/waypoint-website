const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const clean=(v,max=2000)=>String(v??'').trim().slice(0,max);
export async function onRequestPost(context){
  let body;try{body=await context.request.json();}catch{return json({ok:false,error:'Invalid request'},400)}
  if(clean(body.company_site)) return json({ok:true});
  const contact_name=clean(body.contact_name,120),business_name=clean(body.business_name,160),email=clean(body.email,254),request_details=clean(body.request_details,5000);
  if(!contact_name||!business_name||!email||!request_details||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ok:false,error:'Required fields are missing or invalid.'},400);
  const payload={
    source:'Waypoint Website',submitted_at:new Date().toISOString(),contact_name,business_name,email,
    phone:clean(body.phone,40),business_category:clean(body.business_category,120),preferred_contact:clean(body.preferred_contact,40),
    request_details,primary_need:clean(body.primary_need,160),current_presence:clean(body.current_presence,500),
    lead_status:'Needs Review',priority:'Normal',service_type:clean(body.primary_need,160)||'Unclassified',
    request_summary:request_details,quote_status:'Not Started',quote_readiness:'Needs Review',
    next_action:'Review website inquiry and contact prospect',owner_notification:true
  };
  const webhook=context.env.DFD_WEBHOOK_URL;
  if(!webhook) return json({ok:false,error:'Intake destination is not configured.'},503);
  const r=await fetch(webhook,{method:'POST',headers:{'content-type':'application/json','x-waypoint-source':'website'},body:JSON.stringify(payload)});
  if(!r.ok) return json({ok:false,error:'Intake destination rejected the request.'},502);
  return json({ok:true});
}
export function onRequestGet(){return json({ok:false,error:'Method not allowed'},405)}
