
//DON'T TOUCH, UNLESS YOU KNOW WHAT YOU ARE DOING
var req;
var slide;
var sliding = false;
var dashticz_version='0.94.4';
var temperatureBlock=new Object();
var sliderlist = new Object();
var alldevices = new Object();
var uservars = new Object();
var showNavigation;

var _LANGUAGE='en_US';
var _THEME='default';
var _DAY=false;

var _LATITUDE='';
var _LONGITUDE = '';

var _BLOCKSORDER = false;
var _BLOCKSHIDE = new Object();
var _FAVORITES=0;
var _DEBUG=false;

var _DEBUG_JSON = '';
var _GRAPHS_LOADED = new Object();

$(document).ready(function(){

	$.ajax({url: 'CONFIG.js', async: false,dataType: "script"});
	$.ajax({url: 'js/functions.js', async: false,dataType: "script"});
	
	if(_HOST_DOMOTICZ=='') alert('Fill in the path to Domoticz in CONFIG.js!!');
	else {
						
		setInterval(function () {autoGetDevices()}, 500);
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=getSunRiseSet&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
	
				if(time()>=strtotime(date('Y-m-d ')+data.Sunrise) && time()<=strtotime(date('Y-m-d ')+data.Sunset)){
					_DAY=true;
				}
				
				$.ajax({
					url: _HOST_DOMOTICZ+'/json.htm?type=command&param=getuservariables&jsoncallback=?',
					type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
					success: function(data) {
							
						_GRAPHREFRESH = 5;
						_SYSTEMINFO = 1;
						_TRAFFICINFO = 1;
						_GRAPHSEPARATE = 0;
							
						if(typeof(data.result)!=='undefined'){
							
							for(r in data.result){
								uservars[data.result[r]['Name']] = data.result[r];
							}
							
							if(typeof(uservars['dashticz_blockorder'])!=='undefined'){
								var blocksorder = uservars['dashticz_blockorder']['Value'].split(',');
								for(bo in blocksorder){
									if(blocksorder[bo].substr(0,1)=='d'){
										blocksorder[bo] = 'device'+blocksorder[bo].substr(1,blocksorder[bo].length);	
									}
								}
								
								_BLOCKSORDER = blocksorder;
							}
							
							if(typeof(uservars['dashticz_blockhide'])!=='undefined'){
								if(uservars['dashticz_blockhide']['Value'].substr(0,1)=='{'){
									_BLOCKSHIDE = $.parseJSON(uservars['dashticz_blockhide']['Value'].split(','));
								}
								else {
									_BLOCKSHIDE = uservars['dashticz_blockhide']['Value'].split(',');
								}
								
							}
							
							if(typeof(uservars['dashticz_language'])!=='undefined') _LANGUAGE = uservars['dashticz_language']['Value'];
							if(typeof(uservars['dashticz_theme'])!=='undefined') _THEME = uservars['dashticz_theme']['Value'];
							if(typeof(uservars['dashticz_onlyfavorites'])!=='undefined') _FAVORITES = uservars['dashticz_onlyfavorites']['Value'];
							if(typeof(uservars['dashticz_graphrefresh'])!=='undefined') _GRAPHREFRESH = uservars['dashticz_graphrefresh']['Value'];
							if(typeof(uservars['dashticz_showsysteminfo'])!=='undefined') _SYSTEMINFO = uservars['dashticz_showsysteminfo']['Value'];
							if(typeof(uservars['dashticz_showtrafficinfo'])!=='undefined') _TRAFFICINFO = uservars['dashticz_showtrafficinfo']['Value'];
							if(typeof(uservars['dashticz_graphseparate'])!=='undefined') _GRAPHSEPARATE = uservars['dashticz_graphseparate']['Value'];
							//if(typeof(uservars['dashticz_xbmcswitch'])!=='undefined') _XBMCSWITCH = uservars['dashticz_xbmcswitch']['Value'];
						}
						
						if(_LANGUAGE!=='en_US' && _LANGUAGE!=='nl_NL' && _LANGUAGE!=='de_DE' && _LANGUAGE!=='fr_FR'){
							_LANGUAGE='en_US';	
						}
						
						$.ajax({url: 'js/languages/'+_LANGUAGE+'.js', async: false,dataType: "script"});
						if(typeof(_HOST_XBMC)!=='undefined' && _HOST_XBMC!=='') $.ajax({url: 'apps/kodi/kodi.js', async: false,dataType: "script"});
						if(typeof(_HOST_NZBGET)!=='undefined' && _HOST_NZBGET!=='') $.ajax({url: 'apps/nzbget/nzbget.js', async: false,dataType: "script"});
						if(typeof(_HOST_PLEX)!=='undefined' && _HOST_PLEX!=='') $.ajax({url: 'apps/plex/plex.js', async: false,dataType: "script"});
						if(typeof(_HOST_JOINTSPACE)!=='undefined' && _HOST_JOINTSPACE!=='') $.ajax({url: 'apps/jointspace/jointspace.js', async: false,dataType: "script"});
						if(_TRAFFICINFO==1) $.ajax({url: 'apps/vid/vid.js', async: false,dataType: "script"});
		
						$.ajax({url: 'js/blocks.js', async: false,dataType: "script"});
						$.ajax({url: 'js/graphs.js', async: false,dataType: "script"});
						$.ajax({url: 'js/settings.js', async: false,dataType: "script"});
						$.ajax({url: 'js/edit.js', async: false,dataType: "script"});
						$.ajax({url: 'js/switches.js', async: false,dataType: "script"});
						$.ajax({url: 'apps/coffee/coffee.js', async: false,dataType: "script"});
						
						$.ajax({url: 'themes/'+_THEME+'/js/config.js', async: false,dataType: "script"});
						$.ajax({url: 'themes/'+_THEME+'/js/blocks.js', async: false,dataType: "script"});
						
						//$('div#wrapper').append(blocks['topbar']);
						$('div#wrapper').append(blocks['blocks']);
						if(showNavigation) $('div#wrapper').append(blocks['navigation']);
						$('div#wrapper').append(blocks['settings']);
						
						if(_HOST_XBMC!=='' || _HOST_JOINTSPACE!==''){
							$('span#menu').show();	
						}
						
						$('span#dversion').html(dashticz_version);
			
						$('link#themecss').attr('href','themes/'+_THEME+'/css/style.css?'+new Date().getTime());
						$('img#logo').attr('src','themes/'+_THEME+'/images/logo.png');
						
						$.ajax({
							url: _HOST_DOMOTICZ+'/json.htm?type=command&param=getversion&jsoncallback=?',
							type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
							success: function(data) {
								$('span#version').html(data.version);
							}
						});
						
						if(_DAY) var html = '<span id="dayornight"><i class="fa fa-sun-o"></i></span>';
						else var html = '<span id="dayornight"><i class="fa fa-moon-o"></i></span>';
						
						if($('#dayornight').length>0) $('#dayornight').replaceWith(html);
						else $('#sun').append(html);
						
						if(_TRAFFICINFO==1) loadVID();
						if(typeof(_HOST_JOINTSPACE)!=='undefined' && _HOST_JOINTSPACE!=="") loadJointspace();
						if(typeof(_HOST_XBMC)!=='undefined' && _HOST_XBMC!=="") loadXBMC();
						if(typeof(_HOST_PLEX)!=='undefined' && _HOST_PLEX!=="") loadPLEX();
						if(typeof(_HOST_NZBGET)!=='undefined' && _HOST_NZBGET!=="") loadNZBGET();
						autoGetDevices();
					}
				});
			}
		});
	}
});

function switchTheme(theme){
	$('link#theme').attr('href','themes/'+theme+'/css/style.css');	
	if(typeof(uservars['dashticz_theme'])=='undefined'){
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=saveuservariable&vname=theme&vtype=2&vvalue='+theme+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				
			}
		});
	}
	else {
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=updateuservariable&idx='+uservars['dashticz_theme']['idx']+'&vname=theme&vtype=2&vvalue='+theme+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				
			}
		});
	}
}

function setFloorplan(idx){
	if(typeof(uservars['dashticz_currentfloorplan'])=='undefined'){
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=saveuservariable&vname=dashticz_currentfloorplan&vtype=2&vvalue='+idx+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				window.location.reload();
			}
		});
	}
	else {
		$.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=command&param=updateuservariable&idx='+uservars['dashticz_currentfloorplan']['idx']+'&vname=dashticz_currentfloorplan&vtype=2&vvalue='+idx+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				window.location.reload();
			}
		});
	}
	
}

function autoGetDevices(){
	
	/*
	//http://192.168.1.3:8084/json.htm?type=command&param=getplandevices&idx=3
	
	
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=plans&displayhidden=1&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(data) {
			if(typeof(data.result)=='undefined'){
				$('.floorplans').hide();
			}
			else {
				$('.floorplans').show();
				$('.floorplans select').html('');
				$('.floorplans select').append('<option value="0"></option>');
				for(r in data.result){
					var sel='';
					if(typeof(uservars['dashticz_currentfloorplan'])!=='undefined' && uservars['dashticz_currentfloorplan']['Value']==data.result[r]['idx']){
						sel='selected';	
					}
					
					$('.floorplans select').append('<option value="'+data.result[r]['idx']+'" '+sel+'>'+data.result[r]['Name']+'</option>');
				}
			}
		}
	});
	*/
	$('.cameras').hide();
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=cameras&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(data) {
			if(typeof(data.result)=='undefined'){
				if(_DEBUG) openCamera(0,'Camera');
				//$('.cameras').hide();
			}
			else {
				//$('.cameras').show();
				//$('.cameras select').html('');
				//$('.cameras select').append('<option value="0"></option>');
				for(r in data.result){
					openCamera(data.result[r]['idx'],data.result[r]['Name']);
					//$('.cameras select').append('<option value="'+data.result[r]['idx']+'-">'+data.result[r]['Name']+'</option>');
				}
			}
		}
	});
	
	$.ajax({
		url: _HOST_DOMOTICZ+'/json.htm?type=floorplans&jsoncallback=?',
		type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
		success: function(data) {
			if(typeof(data.result)=='undefined'){
				$('.floorplans').hide();
			}
			else {
				$('.floorplans').show();
				$('.floorplans select').html('');
				$('.floorplans select').append('<option value="0"></option>');
				for(r in data.result){
					var sel='';
					if(typeof(uservars['dashticz_currentfloorplan'])!=='undefined' && uservars['dashticz_currentfloorplan']['Value']==data.result[r]['idx']){
						sel='selected';	
					}
					
					$('.floorplans select').append('<option value="'+data.result[r]['idx']+'" '+sel+'>'+data.result[r]['Name']+'</option>');
				}
			}
		}
	});
	
	getDevices();
	setTimeout(function(){ autoGetDevices (); },60000);
}

function openCamera(idx,name){

	var imageUrl = _HOST_DOMOTICZ+'/camsnapshot.jpg?idx='+idx+'&count={COUNT}?t=';
	if(_DEBUG) var imageUrl = 'http://77.168.185.144:50080/mjpg/video.mjpg?count={COUNT}&time=';
	
	imageUrl = str_replace('{COUNT}','0',imageUrl);
	
	var camera='';
	camera='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="camera'+idx+'">';
		camera+='<div class="panel panel-block panel-default" data-idx="'+idx+'">';
			camera+='<div class="panel-heading">';
				camera+='<div class="row">';
						camera+='<div class="col-xs-8">';
							camera+='<div class="huge">'+name+'</div>';
							//camera+='<div>'+name+'</div>';
						camera+='</div>';
						camera+='<div class="col-xs-4 text-right icon">';
							camera+='<div><img class="camimage'+idx+'" style="height:62px;" src="'+imageUrl+new Date().getTime()+'" width="100%" /></div>';
						camera+='</div>';
				
					camera+='</div>';
			camera+='</div>';
			camera+='<a href="javascript:void(0);" data-toggle="modal" data-target="#cameramodal'+idx+'">';
				camera+='<div class="panel-footer">';
					camera+='<span class="pull-left">'+lang['view']+'</span>';
					camera+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
					camera+='<div class="clearfix"></div>';
				camera+='</div>';
			camera+='</a>';
		camera+='</div>';
	camera+='</div>';
	
	var cameramodal ='<div class="modal fade" id="cameramodal'+idx+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		cameramodal+='<div class="modal-dialog">';
			cameramodal+='<div class="modal-content">';
				cameramodal+='<div class="modal-header">';
					cameramodal+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
					cameramodal+='<h4 class="modal-title" id="myModalLabel">'+name+'</h4>';
				cameramodal+='</div>';
				cameramodal+='<div class="modal-body">';
					cameramodal+='<img class="camimage'+idx+'" src="'+imageUrl+new Date().getTime()+'" width="1000" />';
				cameramodal+='</div>';
				cameramodal+='<div class="modal-footer">';
					cameramodal+='<button type="button" class="btn btn-default" data-dismiss="modal">Sluiten</button>';
				cameramodal+='</div>';
			cameramodal+='</div>';
		cameramodal+='</div>';
	cameramodal+='</div>';
	
	reloadCamImage(idx,imageUrl,0);
	
	if($('#camera'+idx).length>0){
		$('#camera'+idx).replaceWith(camera);
		$('#cameramodal'+idx).replaceWith(cameramodal);
	}
	else{
		$('.row.dashboard').append(camera);
		$('body').append(cameramodal);
	}
	
}

function reloadCamImage(idx,imageUrl,counter){
	var newcount = (counter+1);
	imageUrl = str_replace('count='+counter+'&','count='+newcount+'&',imageUrl);
	$('.camimage'+idx).attr('src',imageUrl+new Date().getTime());
	
	var image=new Image()
	image.src=imageUrl+new Date().getTime()
	image.onload=function(){
		$('.camimage'+idx).attr('src',image.src);
		setTimeout(function(){
			reloadCamImage(idx,imageUrl,newcount);
		},500);	
	}
		
}

function getDevices(){
	var floorplan='';
	if(typeof(uservars['dashticz_currentfloorplan'])!=='undefined' && parseFloat(uservars['dashticz_currentfloorplan']['Value'])>0){
		floorplan='&floor='+uservars['dashticz_currentfloorplan']['Value'];
	}
	
	if(!sliding){
		if(typeof(req)!=='undefined') req.abort();
		req = $.ajax({
			url: _HOST_DOMOTICZ+'/json.htm?type=devices&filter=all&used=true&order=Name'+floorplan+'&jsoncallback=?',
			type: 'GET',async: false,contentType: "application/json",dataType: 'jsonp',
			success: function(data) {
				if(_DEBUG && _DEBUG_JSON!==''){
					data = _DEBUG_JSON;
					data = $.parseJSON(data);
				}
				if(typeof(data.Latitude)!=='undefined') _LATITUDE = data.Latitude;
				if(typeof(data.Longitude)!=='undefined') _LONGITUDE = data.Longitude;
				
				for(r in data.result){
					alldevices[data.result[r]['idx']] = data.result[r];
								
					if(
						_DEBUG || (
							(_FAVORITES==1 && data.result[r]['Favorite']==1) || 
							_FAVORITES==0 || 
							(typeof(uservars['dashticz_currentfloorplan'])!=='undefined' && parseFloat(uservars['dashticz_currentfloorplan']['Value'])>0)
						)
						
					){
						var current='';
						if(typeof(data.result[r]['CounterToday'])!=='undefined') var current=lang['graph_today']+' '+data.result[r]['CounterToday'];
						else if(typeof(data.result[r]['Usage'])!=='undefined') var current=data.result[r]['Usage'];
						else if(typeof(data.result[r]['Rain'])!=='undefined') var current=data.result[r]['Rain']+'mm';
						else if(typeof(data.result[r]['Status'])!=='undefined') var current=data.result[r]['Status'];
						else if(data.result[r]['TypeImg']=='temperature'){
							var current=data.result[r]['Data'].split(' ');
							current = current[0]+'&deg;';
						}
						else if(typeof(data.result[r]['Data'])!=='undefined') var current=data.result[r]['Data'];
						else if(typeof(data.result[r]['Name'])!=='undefined') var current=data.result[r]['Name'];
						
						if(data.result[r]['SubType']=='Energy' || data.result[r]['Type']=='Energy'){
							current = lang['graph_current']+' '+data.result[r]['Usage']+', '+current;
						}
						if(data.result[r]['SubType']=='Electric'){
							current = parseFloat(data.result[r]['Data'].replace( / Watt$/g, ''));
						}
						if(data.result[r]['SwitchType']=='Dimmer'){
							current = data.result[r]['Level'];
						}
						
						if(data.result[r]['Type']=='Temp + Humidity'){
							current= current+' / '+data.result[r]['Humidity']+'%'+'<br />'+data.result[r]['HumidityStatus']+'';
						}
						
						if(
							data.result[r]['HardwareName']=='Motherboard'
						){
							var html = '<span id="system'+data.result[r]['idx']+'">'+data.result[r]['Name']+': <B>'+current+'</B>&nbsp;&nbsp;&nbsp;</span>';
							if($('#system'+data.result[r]['idx']).length>0){
								$('#system'+data.result[r]['idx']).replaceWith(html);
							}
							else $('#systeminfo').append(html);
						}
	
						// now process data	
						if(
							data.result[r]['SubType']=='Energy' ||
							data.result[r]['Type']=='Energy' ||
							data.result[r]['SubType']=='Gas' ||
							data.result[r]['SubType']=='Electric'
						){
							showGraph(data.result[r]['idx'],data.result[r]['Name'],lang['graph_usage'],'last',current,false,'counter');
						}
						else if (data.result[r]['HardwareName']=='Motherboard' && data.result[r]['Type']=='Temp'){
							showGraph(data.result[r]['idx'],data.result[r]['Name'],lang['graph_temperature'],'last',current,false,'temp');
						}
						else if (data.result[r]['HardwareName']=='Motherboard' && (stristr(data.result[r]['Name'],'cpu') || stristr(data.result[r]['Name'],'hdd') || stristr(data.result[r]['Name'],'geheugen') || stristr(data.result[r]['Name'],'memory'))){
							showGraph(data.result[r]['idx'],data.result[r]['Name'],lang['graph_percentage'],'last',current,false,'Percentage');
						}
						else if(
							data.result[r]['SubType']=='Solar Radiation'
						){
							showGraph(data.result[r]['idx'],data.result[r]['Name'],lang['graph_radiation'],'last',current,false,'counter');
						}
						else {
		
							if(data.result[r]['HardwareName']!=='RFXcom' && (data.result[r]['Type']=='Temp + Humidity + Baro' || data.result[r]['Type']=='Rain' || data.result[r]['Type']=='Wind')){
								if(typeof(temperatureBlock['Wunderground'])=='undefined'){
									temperatureBlock['Wunderground'] = new Object();
								}
								
								if(data.result[r]['Type']=='Wind'){ 
									temperatureBlock['Wunderground']['Direction'] = data.result[r]['DirectionStr']; 
									temperatureBlock['Wunderground']['Gust'] = data.result[r]['Gust']; 
								}
								else if(typeof(data.result[r]['Rain'])!=='undefined'){ temperatureBlock['Wunderground']['Rain'] = data.result[r]['Rain']; }
								else if(typeof(data.result[r]['ForecastStr'])!=='undefined'){
									temperatureBlock['Wunderground']['Forecast'] = data.result[r]['ForecastStr'];
									
									d = data.result[r]['Data'].split(', ');
									temperatureBlock['Wunderground']['Temp'] = d[0].replace(' C','&deg;');
									temperatureBlock['Wunderground']['Humidity'] = d[1];
									temperatureBlock['Wunderground']['Pressure'] = d[2];
									temperatureBlock['Wunderground']['DewPoint'] = data.result[r]['DewPoint'];
									temperatureBlock['Wunderground']['HumidityStatus'] = data.result[r]['HumidityStatus'];
								}
								
							}
							else if(!sliding && !in_array(data.result[r]['idx'],_BLOCKSHIDE)){
								var currentdate = '<span class="small">'+lang['last_seen']+': '+date('d-m H:i',strtotime(data.result[r]['LastUpdate']))+'</span>';
								
								if(
									(data.result[r]['Status']!=='Off' && parseFloat(data.result[r]['Level'])>0) || 
									data.result[r]['Status']=='On' ||
									parseFloat(data.result[r]['Rain'])>0
								){
									var iconclass = 'device-active';
									var deviceactive = 'device-online';
								}
								else {
									var iconclass = 'device-inactive';
									var deviceactive = 'device-offline';
								}
								
								var html = '';
								var setslide='';
								var element = data.result[r];							
								
								if(element['SwitchType']=='Push On Button' || element['SwitchType']=='On/Off' || element['SwitchType']=='Doorbell' || element['SwitchType']=='Door Lock' || element['Type']=='Scene' || element['Type']=='Group'){
									if(element['Protected'] == true){
										var html = blocks['protected'];
									}
									else if(element['Type']=='Scene') {
										var html = blocks['scene'];
									}
									else if(element['SwitchType']=='Doorbell' || element['SwitchType']=='Push On Button' || element['SwitchType']=='Door Lock') {
										var html = blocks['pushbutton'];
									}
									else if(element['Type']=='Group') {
										var html = blocks['group'];
									}
									else{
										var html = blocks['switch'];
									}
								}
								else if(element['SwitchType']=='Dimmer'){
									var html = blocks['dimmer'];
									var setslide = 'sl'+element['idx'];
								}
								else if(data.result[r]['HardwareName'] == 'Coffee machine') {
									var html = blocks['coffee'];
									var status = element['Data'];
									var lastSeen = element['lastUpdate'];
									html = str_replace('[COFFEE_STATUS_LOWER]',element['Data'].toLowerCase(),html);
							    }
								else {// if(element['TypeImg']!=='temperature') {
									var html = blocks['noswitch'];
								}
								
								
								var icon='';		
								if(element['Image']=='Media'){
									icon='fa fa-play-circle-o';
								}
								else if(element['SwitchType']=='Door Lock' || element['SwitchType']=='Contact') icon='fa-door-open ';
								else if(element['Type']=='Scene' || element['Type']=='Group' || element['Image']=='Light') icon='fa fa-lightbulb-o';
								else if(element['Image']=='Heating') icon='fa fa-fire';
								else if(element['TypeImg']=='temperature') icon='wi wi-thermometer';
								else if(element['SubType']=='Solar Radiation') icon='fa fa-sun-o';
								else if(element['Type']=='Rain') icon='fa fa-umbrella';
								else if(element['Type']=='Wind') icon='fa fa-location-arrow';
								else if(element['Image']=='TV') icon='icomoon icon-tv';
								else if(element['Image']=='ComputerPC') icon='fa fa-desktop';
								else if(element['Image']=='Computer') icon='fa fa-desktop';
								else if(element['Image']=='Printer') icon='fa fa-print';
								
								var headingclass='';
								if(element['TypeImg']=='temperature' || element['SwitchType']=='Contact') headingclass=' nodetails';
								
								if(element['SwitchType']=='Dimmer'){
									var name = element['Name'];
									var level = element['Level'];
								}
								else {
									if(element['Name']=='jointspace-TV Schakelaar'){
										var name='TV Schakelaar';
									}
									else {
										var name=element['Name'];
									}
									var level = '';
								}
								
								if(current=='Off') current = lang['current_off'];
								if(current=='On') current = lang['current_on'];
								
								if(current=='Open') current = lang['current_open'];
								if(current=='Closed') current = lang['current_closed'];
								
								html = str_replace('[IDX]',element['idx'],html);
								html = str_replace('[NAME]',name,html);
								html = str_replace('[CURRENT]',current,html);
								html = str_replace('[LEVEL]',level,html);
								html = str_replace('[ICON]',icon,html);
								html = str_replace('[ICONCLASS]',iconclass,html);
								html = str_replace('[HEADERCLASS]',headingclass,html);
								html = str_replace('[DEVICEACTIVE]',deviceactive,html);
								html = str_replace('[SWITCH_FUNCTION]','switchDevice',html);
								html = str_replace('[LANG_SWITCH]',lang['switch'],html);
								html = str_replace('[LANG_LOCKED]',lang['locked'],html);
								html = str_replace('[LANG_TURNON]',lang['turn_on'],html);
								html = str_replace('[LANG_ACTIVATE]',lang['activate'],html);
								html = str_replace('[CURRENT_DATE]',currentdate,html);
	
								if($('#device'+element['idx']).length>0){
									$('#device'+element['idx']).replaceWith(html);
								}
								else $('.row.dashboard').append(html);
							}
							
							if(setslide!==''){
								initSlider(setslide,element);
								setslide='';
							}
						}
					}
				}
				
				if(typeof(temperatureBlock['Wunderground'])!=='undefined'){
					var wg = temperatureBlock['Wunderground'];
					var html = blocks['wunderground'];
					
					var content = '';
					if(typeof(wg['Rain'])!=='undefined') content+='Rain: '+wg['Rain']+'mm<br />';
					if(typeof(wg['Gust'])!=='undefined') content+='Gust: '+wg['Gust']+', '+wg['Direction']+'<br />';
					if(typeof(wg['Humidity'])!=='undefined') content+='Pressure: '+wg['Pressure']+', '+wg['Humidity']+'<br />';
										
					html = str_replace('[TITLE]',wg['Temp'],html);
					html = str_replace('[CONTENT]',content,html);
					
					var icon = 'fa-umbrella';
					if((typeof(wg['Rain'])!=='undefined' && wg['Rain']>0) || stristr(wg['Forecast'], 'rain')){
						var iconclass = 'Skycons.RAIN';
					}
					else if(stristr(wg['Forecast'], 'Partly Cloudy')){
						if(_DAY) var iconclass = 'Skycons.PARTLY_CLOUDY_DAY';
						else var iconclass = 'Skycons.PARTLY_CLOUDY_NIGHT';
					}
					else if(stristr(wg['Forecast'],'sunny') || stristr(wg['Forecast'],'clear')){
						if(_DAY) var iconclass = 'Skycons.CLEAR_DAY';
						else var iconclass = 'Skycons.CLEAR_NIGHT';
					}
					else if(stristr(wg['Forecast'],'Cloudy')){
						var iconclass = 'Skycons.CLOUDY';
					}
					else if(stristr(wg['Forecast'],'sleet')){
						var iconclass = 'Skycons.SLEET';
					}
					else if(stristr(wg['Forecast'],'snow')){
						var iconclass = 'Skycons.SNOW';
					}
					else if(stristr(wg['Forecast'],'wind')){
	
						var iconclass = 'Skycons.WIND';
					}
					else if(stristr(wg['Forecast'],'fog')){
						var iconclass = 'Skycons.FOG';
					}
					else {
						var iconclass = 'Skycons.CLEAR_DAY';
					}
					
					if($('#wunderground').length>0){
						$('#wunderground').replaceWith(html);
					}
					else $('.row.dashboard').first().prepend(html);
					
					var skycons = new Skycons({"color": "#959da6"});
					skycons.add("icon_wg", eval(iconclass));
					skycons.play();
				}
					
				if(_LATITUDE!=="" && _LONGITUDE!==""){
					$.ajax({url: 'apps/buienradar/buienradar.js', async: false,dataType: "script"});
						getBuienradar();
					//});
				}
				
				for(bo in _BLOCKSORDER){
					var clone = $('#'+_BLOCKSORDER[bo]);
					var parent = $('#'+_BLOCKSORDER[bo]).parent();
					$('#'+_BLOCKSORDER[bo]).remove();
					parent.append(clone);
				}
				
				/*
				if($('#knmiradar').length==0){
					setTimeout(function(){
						var html = blocks['knmiradar'];
						parent.prepend(html);
					},5000);
				}
				*/
			}
		});
	}
}

function initSlider(setslide,element){
	setTimeout(function(){
		var current = parseFloat($('#'+setslide).val());
	if(element['Type'] == 'Lighting Limitless/Applamp'){
		sliderlist[setslide] = current;
		$('#'+setslide).slider({
			value:sliderlist[setslide],
			step: 10,
			min:1,
			max:100
		})
		.on('slide', function(ev){
			sliding = true;
		})
		.on('slideStop', function(ev){
			$('#current'+ $(this).attr('id').substr(2)).text(ev.value);
			slideDevice($(this).attr('id').substr(2),ev.value);
		});
	}
	else {
		sliderlist[setslide] = Math.ceil((current/100)*16);
		$('#'+setslide).slider({
			value:sliderlist[setslide],
			step: 1,
			min:1,
			max:16
		})
		.on('slide', function(ev){
			sliding = true;
		})
		.on('slideStop', function(ev){
			$('#current'+ $(this).attr('id').substr(2)).text(Math.ceil(ev.value/0.16));
			slideDevice($(this).attr('id').substr(2),ev.value);
		});
	}
	},1000);
}

function showDashboard(){
	if(_GRAPHSEPARATE==1){
		$('.row.dashboard').show();
		$('.row.graphs').css('opacity',0);
	}
	else {
		$('.row.dashboard').show();
		$('.row.graphs').show();
	}
	
	$('.row.xbmc').hide();
	$('.row.remote').hide();
}