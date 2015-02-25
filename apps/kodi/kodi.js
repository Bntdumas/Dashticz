//DON'T TOUCH, UNLESS YOU KNOW WHAT YOU ARE DOING
var xbmcinteract=false;
var xbmcdevice;
var reqxbmc;

function loadXBMC(){
	getXbmc();
	openXbmcLibrary();
}

$(window).resize(function(){
	if(_HOST_XBMC!==""){
		$('.movieitem img.poster').height('auto');
	
		clearTimeout($.data(this, 'resizeTimer'));
    	$.data(this, 'resizeTimer', setTimeout(function() {
    	    checkHeighestPoster();
   		}, 500));
	}
});

function showXbmc(){
	$('.row').show();
	$('.row.dashboard').hide();
	$('.row.graphs').hide();
	$('.row.remote').hide();
	checkHeighestPoster();
}

function checkHeighestPoster(){
	var highestBox = 0;
	$('.movieitem').each(function(){
		if($(this).find('img.poster').height() > highestBox) {
		   highestBox = $(this).find('img.poster').height(); 
		}
	});
	
	$('.movieitem img.poster').height(highestBox);	
}


function openXbmcLibrary(){
	_data = {"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies",  "params": {"sort": {"order": "ascending", "method": "title"}, "properties": ["title", "art"] }, "id": 1};

	$.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(data){
		if(data!=="{}"){
			data=$.parseJSON(data);
			for(m in data['result']['movies']){
				if($('#movie'+data['result']['movies'][m]['movieid']).length==0){
	
					var html='<div class="col-sm-2 movieitem" id="movie'+data['result']['movies'][m]['movieid']+'">';
						html+='<div class="panel">';
							html+='<div class="panel-heading">';
								html+='<img class="poster" width="100%" src="'+decodeURIComponent(data['result']['movies'][m]['art']['poster']).substr(0,decodeURIComponent(data['result']['movies'][m]['art']['poster']).length - 1).replace('image://','').replace('/original/','/w396/')+'" alt="'+data['result']['movies'][m]['label']+' title="'+data['result']['movies'][m]['label']+'"/>';		
							html+='</div>';
							
							html+='<a class="details" href="javascript:playMovie('+data['result']['movies'][m]['movieid']+');">';
								html+='<div class="panel-footer">';
									html+='<span class="pull-left">'+lang['media_play']+'</span>';
									html+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
									html+='<div class="clearfix"></div>';
								html+='</div>';
							html+='</a>';
						html+='</div>';
					html+='</div>';
					  
					$('.row.xbmc').append(html);
				}
			}
		}
		
	});
}

function playMovie(ID){
	alert('Not yet implemented!');
}

/*
XBMC DOWN={"jsonrpc":"2.0","method":"Input.Down","id":1}
XBMC RIGHT={"jsonrpc":"2.0","method":"Input.Right","id":1}
XBMC SELECT={"jsonrpc":"2.0","method":"Input.Select","id":1}
XBMC LEFT={"jsonrpc":"2.0","method":"Input.Left","id":1}
XBMC INFO={"jsonrpc":"2.0","method":"Input.Info","id":1}
XBMC HOME={"jsonrpc":"2.0","method":"Input.Home","id":1}
XBMC UP={"jsonrpc":"2.0","method":"Input.Up","id":1}
XBMC ContextMenu={"jsonrpc":"2.0","method":"Input.ContextMenu","id":1}
XBMC 30SecForward={"jsonrpc":"2.0","id":1,"method":"Player.Seek","params":{"playerid":1,"value":"smallforward"}}
XBMC 30SecBkwd={"jsonrpc":"2.0","id":1,"method":"Player.Seek","params":{"playerid":1,"value":"smallbackward"}}
XBMC QUIT={"jsonrpc":"2.0","method":"Application.Quit","id":1}
XBMC BACK={"jsonrpc":"2.0","method":"Input.Back","id":1}
XBMC PLAYPAUSE={"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":1},"id":1}
XBMC STOP={"jsonrpc":"2.0","method":"Player.Stop","params":{"playerid":1},"id":1}
XBMC SUBTITLENEXT={"jsonrpc":"2.0","id":1,"method":"Player.SetSubtitle","params":{"playerid":1,"subtitle":"next"}}
XBMC SUBTITLEOFF={"jsonrpc":"2.0","id":1,"method":"Player.SetSubtitle","params":{"playerid":1,"subtitle":"off"}}
XBMC SUBTITLEON={"jsonrpc":"2.0","id":1,"method":"Player.SetSubtitle","params":{"playerid":1,"subtitle":"off"}}
XBMC SHOWOSD={"jsonrpc":"2.0","method":"Input.ShowOSD","id":1}
XBMC SETFULLSCREEN={"jsonrpc": "2.0", "method": "GUI.SetFullscreen", "params": { "fullscreen": "toggle" }, "id": "1"}
XBMC MOVIESLIST={ "jsonrpc": "2.0", "method": "GUI.ActivateWindow", "params": { "window": "video", "parameters": [ "MovieTitles" ] }, "id": 1 }
XBMC TVLIST={"jsonrpc": "2.0", "method": "GUI.ActivateWindow", "params": { "window": "video", "parameters": [ "TvShowTitles" ] }, "id": 1 } 
*/

function playpauseMedia(playerid){
	xbmcinteract = true;
	$('#xbmc-playing .pause,#xbmc-playing .play').toggle();	
	
	_data = {"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":playerid},"id":1};
	delete reqxbmc;
	reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
		delete reqxbmc;
		setTimeout(function(){ getXbmc(); },1000); 
		xbmcinteract=false;
	});
}

function forwardMedia(playerid){
	xbmcinteract = true;
	//$('#xbmc-playing .pause,#xbmc-playing .play').toggle();	
	
	_data = {"jsonrpc":"2.0","method":"Player.GoTo","params":{"playerid":playerid,"to":"next"},"id":1};
	delete reqxbmc;
	reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
		delete reqxbmc;
		setTimeout(function(){ getXbmc(); },1000); 
		xbmcinteract=false;
	});
}

function backwardMedia(playerid){
	xbmcinteract = true;
	//$('#xbmc-playing .pause,#xbmc-playing .play').toggle();	
	
	_data = {"jsonrpc":"2.0","method":"Player.GoTo","params":{"playerid":playerid,"to":"previous"},"id":1};
	delete reqxbmc;
	reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
		delete reqxbmc;
		setTimeout(function(){ getXbmc(); },1000); 
		xbmcinteract=false;
	});
}

function stopMedia(playerid){
	xbmcinteract = true;
	$('#xbmc-playing .pause,#xbmc-playing .play').toggle();	
	
	_data = {"jsonrpc":"2.0","method":"Player.Stop","params":{"playerid":playerid},"id":1};
	delete reqxbmc;
	reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
		$('#xbmc-playing').remove();	
		delete reqxbmc;
		xbmcinteract=false;
	});
}


function getXbmc(){
	if(_HOST_XBMC!==""){
		if(!xbmcinteract && typeof(reqxbmc)=='undefined'){
			_data = {"jsonrpc": "2.0", "method": "Player.GetActivePlayers", "id": 1};
			reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(active){
				if(active=='{}'){
					alert('No connection with XBMC/Kodi-host at '+_HOST_XBMC+'!');
				}
				else {
					active=$.parseJSON(active);
					if(typeof(active['result'][0])!=='undefined'){
						active = active['result'][0];
						delete reqxbmc;
						if(active['type']=='video'){
							_data = {"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["title", "album", "artist", "season", "episode", "duration", "showtitle", "tvshowid", "thumbnail", "file", "fanart", "streamdetails"], "playerid": active['playerid'] }, "id": "VideoGetItem"};
							reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(data){
								data=$.parseJSON(data);
								
								if(data!=="{}" && typeof(data['result'])!=='undefined'){
									_data = {"jsonrpc": "2.0", "method": "Player.GetProperties", "params": { "properties": ["playlistid","speed","position","totaltime","time"], "playerid": active['playerid'] }, "id": "VideoGetItem"};
									reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
										prop=$.parseJSON(prop);
										
										if(typeof(prop['result'])!=='undefined'){
											dis_pause = '';
											dis_play = 'display:none;';
											if(prop['result']['speed']==0){
												dis_pause = 'display:none;';
												dis_play = '';
											}
											
											var html='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="xbmc-playing">';
												html+='<div class="panel panel-default">';
													html+='<div class="panel-heading">';
														html+='<div class="row">';
															html+='<div class="col-xs-12 text-left">';
																if(data['result']['item']['type'] == 'movie'){
																	label = data['result']['item']['label'].split(' - ');
																	label[0] = label[0].replace('.avi','').replace('.mkv','');
																	html+='<div class="huge">'+label[0]+'</div>';
																	if(typeof(label[1])!=='undefined') html+='<div>'+label[1]+'</div>';
																	else html+='<div>&nbsp;</div>';
																}
																else {
																	html+='<div class="huge">'+data['result']['item']['showtitle']+'</div>';
																	
																	var season = data['result']['item']['season'];
																	if(season<10) season='0'+season;
																	var episode = data['result']['item']['episode'];
																	if(episode<10) episode='0'+episode;
																	
																	html+='<div>S'+season+'E'+episode+' - '+data['result']['item']['label']+'</div>';
																}
																
															html+='</div>';
														html+='</div>';
													html+='</div>';
													
													var currenttime = '';
													if(prop['result']['time']['hours']>0){
														if(prop['result']['time']['hours']<10) currenttime+='0';
														currenttime+=prop['result']['time']['hours']+':';
													}
													
													if(prop['result']['time']['minutes']<10) currenttime+='0';
													currenttime+=prop['result']['time']['minutes']+':';
													if(prop['result']['time']['seconds']<10) currenttime+='0';
													currenttime+=prop['result']['time']['seconds'];
													currenttime+=' / ';
													if(prop['result']['totaltime']['hours']>0){
														if(prop['result']['totaltime']['hours']<10) currenttime+='0';
														currenttime+=prop['result']['totaltime']['hours']+':';
													}
													if(prop['result']['totaltime']['minutes']<10) currenttime+='0';
													currenttime+=prop['result']['totaltime']['minutes']+':';
													if(prop['result']['totaltime']['seconds']<10) currenttime+='0';
													currenttime+=prop['result']['totaltime']['seconds'];
													
													html+='<a class="details pause" style="'+dis_pause+'" href="javascript:playpauseMedia('+active['playerid']+');">';
														html+='<div class="panel-footer">';
															html+='<span class="pull-left">'+lang['media_pause']+'<div style="font-size:13px;margin-top:-3px">'+currenttime+'</div></span>';
															html+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
															html+='<div class="clearfix"></div>';
														html+='</div>';
													html+='</a>';
												
													html+='<a class="details play" style="'+dis_play+'" href="javascript:playpauseMedia('+active['playerid']+');">';
														html+='<div class="panel-footer">';
															html+='<span class="pull-left">'+lang['media_resume']+'<div style="font-size:13px;margin-top:-3px">'+currenttime+'</div></span>';
															html+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
															html+='<div class="clearfix"></div>';
														html+='</div>';
													html+='</a>';
												html+='</div>';
											html+='</div>';
											
											if($('#xbmc-playing').length>0){
												$('#xbmc-playing').replaceWith(html);
											}
											else $('.row.dashboard:first').prepend(html);
										}
										else {
											$('#xbmc-playing').remove();	
										}
										
									});	
								}
								else {
									$('#xbmc-playing').remove();	
								}
								delete reqxbmc;
								setTimeout(function(){ getXbmc(); },1000); 
										
							});	
						}
						else if(active['type']=='audio'){
							_data = {"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["title", "album", "artist", "duration", "thumbnail", "file", "fanart", "streamdetails"], "playerid": active['playerid'] }, "id": "AudioGetItem"};
							reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(data){
								data=$.parseJSON(data);

								console.log(data);
								if(data!=="{}" && typeof(data['result'])!=='undefined'){
									_data = {"jsonrpc": "2.0", "method": "Player.GetProperties", "params": { "properties": ["playlistid","speed","position","totaltime","time"], "playerid": active['playerid'] }, "id": "AudioGetItem"};
									reqxbmc = $.post('apps/kodi/kodi.php?host='+_HOST_XBMC,_data,function(prop){
										prop=$.parseJSON(prop);
										
										console.log(prop);
										var html='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="xbmc-playing">';
											html+='<div class="panel panel-default">';
												html+='<div class="panel-heading">';
													html+='<div class="row">';
														html+='<div class="col-xs-12 text-left">';
																html+='<div class="huge">'+data['result']['item']['artist'][0]+'</div>';
																html+='<div>'+data['result']['item']['label']+'</div>';
															
														html+='</div>';
													html+='</div>';
												html+='</div>';
												
												dis_pause = '';
												dis_play = 'display:none;';
												if(typeof(prop['result']['speed'])!=='undefined' && prop['result']['speed']==0){
													dis_pause = 'display:none;';
													dis_play = '';
												}
												
												var currenttime = '';
												if(prop['result']['time']['hours']>0){
													if(prop['result']['time']['hours']<10) currenttime+='0';
													currenttime+=prop['result']['time']['hours']+':';
												}
												
												if(prop['result']['time']['minutes']<10) currenttime+='0';
												currenttime+=prop['result']['time']['minutes']+':';
												if(prop['result']['time']['seconds']<10) currenttime+='0';
												currenttime+=prop['result']['time']['seconds'];
												currenttime+=' / ';
												if(prop['result']['totaltime']['hours']>0){
													if(prop['result']['totaltime']['hours']<10) currenttime+='0';
													currenttime+=prop['result']['totaltime']['hours']+':';
												}
												if(prop['result']['totaltime']['minutes']<10) currenttime+='0';
												currenttime+=prop['result']['totaltime']['minutes']+':';
												if(prop['result']['totaltime']['seconds']<10) currenttime+='0';
												currenttime+=prop['result']['totaltime']['seconds'];
												
												html+='<div class="details pause" style="'+dis_pause+'">';
													html+='<div class="panel-footer">';
														html+='<span class="pull-left">'+lang['media_pause']+'<div style="font-size:13px;margin-top:-3px">'+currenttime+'</div></span>';
														html+='<span class="pull-right media"><a href="javascript:backwardMedia('+active['playerid']+');"><i class="fa fa-step-backward"></i></a>&nbsp;&nbsp;<a href="javascript:stopMedia('+active['playerid']+');"><i class="fa fa-stop"></i></a>&nbsp;&nbsp;<a href="javascript:playpauseMedia('+active['playerid']+');"><i class="fa fa-pause"></i></a>&nbsp;&nbsp;<a href="javascript:forwardMedia('+active['playerid']+');"><i class="fa fa-step-forward"></i></a></span>';
														html+='<div class="clearfix"></div>';
													html+='</div>';
												html+='</div>';
											
												
												html+='<div class="details play" style="'+dis_play+'">';
													html+='<div class="panel-footer">';
														html+='<span class="pull-left">'+lang['media_resume']+'<div style="font-size:13px;margin-top:-3px">'+currenttime+'</div></span>';
														html+='<span class="pull-right media"><a href="javascript:backwardMedia('+active['playerid']+');"><i class="fa fa-step-backward"></i></a>&nbsp;&nbsp;<a href="javascript:stopMedia('+active['playerid']+');"><i class="fa fa-stop"></i></a>&nbsp;&nbsp;<a href="javascript:playpauseMedia('+active['playerid']+');"><i class="fa fa-play"></i></a>&nbsp;&nbsp;<a href="javascript:forwardMedia('+active['playerid']+');"><i class="fa fa-step-forward"></i></a></span>';
														html+='<div class="clearfix"></div>';
													html+='</div>';
												html+='</div>';
												
											html+='</div>';
										html+='</div>';
											
										if($('#xbmc-playing').length>0){
											$('#xbmc-playing').replaceWith(html);
										}
										else $('.row.dashboard:first').prepend(html);
									});
								}
								else {
									$('#xbmc-playing').remove();	
								}
								delete reqxbmc;
								setTimeout(function(){ getXbmc(); },1000); 
							});
						}
					}
				}
			});
		}
	}
}