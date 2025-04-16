function parseUplink(device, payload)
{

// Show the payload as String
    env.log("Payload as String : ", payload.asString());
    env.log('Payload port      : ', payload.port);     
    env.log('Payload topic     : ', payload.topic);

var data = payload.asJsonObject();    
var payload_loaded = data.payload;

var latitud = 0;
    for (let index = 1; index < 10; index++)
    {
    latitud = latitud + payload_loaded[index*2+1]* (10**(10 - index - 1) );
    }

    // negative
    if  ( payload_loaded[1] == 'd')
        latitud = latitud * ( -1);

    latitud= latitud/1000000;

    env.log('Latitud      : ', latitud );

    var longitud = 0;
    for (let index = 11; index < 20; index++)
    {
    longitud = longitud + payload_loaded[index*2+1]* (10**(20 - index - 1) );
    }

    // negative
    if  ( payload_loaded[21] == 'd')
        longitud = longitud * ( -1);    

    longitud= longitud/1000000;        

    env.log('Longitud   : ', longitud );

	var locationTracker = device.endpoints.byType(endpointType.locationTracker);
	if (locationTracker != null)
	{
		locationTracker.updateLocationTrackerStatus(latitud, longitud);
        device.updateDeviceGeolocation(latitud, longitud);
	}

}

function buildDownlink(device, endpoint, command, payload) 
{ 
}