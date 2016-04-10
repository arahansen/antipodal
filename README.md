 ##Antipodal Webtask

 Find out what's happening on the opposite side (:sparkles:the antipode:sparkles:) of the world!
 
 Uses Auth0's Webtask backendless server-side code tooling [webtask.io](https://webtask.io)
 URL: https://webtask.it.auth0.com/api/run/wt-andrew-arahansen_com-0/antipodal?webtask_no_cache=1

 params:
 lat (required): requested latitude
 lng (required): requested longitude
 web (optional): return format suitable for displaying on the web

 returns:
 weather: 
    a short description of the weather at the requested lat/lng antipode with an emoji for flair (currently supports cloud and sun emoji)
 location:
    descriptive name of where the antipode lat/lng is located as well as the calculated antipode