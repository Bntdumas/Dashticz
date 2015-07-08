var blocks = new Object();

/*
//KNMI RADAR
blocks['knmiradar']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="knmiradar" style="height:279px;">';
	blocks['knmiradar']+='<div class="panel panel-block panel-default panel-protected" style="height:279px;">';
		blocks['knmiradar']+='<div class="row">';
			blocks['knmiradar']+='<div class="col-xs-8">';
				blocks['knmiradar']+='<img src="http://www.knmi.nl/actueel/images/tempgmt.png" style="margin:10px;height:256px;" />';
			blocks['knmiradar']+='</div>';
		blocks['knmiradar']+='</div>';
	blocks['knmiradar']+='</div>';
blocks['knmiradar']+='</div>';
*/
			
//REGULAR SWITCH									
blocks['switch']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['switch']+='<div class="panel panel-block panel-default panel-switch [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['switch']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['switch']+='<div class="row">';
				blocks['switch']+='<div class="col-xs-8">';
					blocks['switch']+='<div class="huge">[CURRENT]</div>';
					blocks['switch']+='<div>[NAME]</div>';
				blocks['switch']+='</div>';
				blocks['switch']+='<div class="col-xs-4 text-right icon">';
					blocks['switch']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['switch']+='</div>';
			blocks['switch']+='</div>';
		blocks['switch']+='</div>';

		blocks['switch']+='<a href="javascript:[SWITCH_FUNCTION]([IDX]);">';
			blocks['switch']+='<div class="panel-footer">';
				blocks['switch']+='<span class="pull-left">[LANG_SWITCH][CURRENT_DATE]</span>';
				blocks['switch']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['switch']+='<div class="clearfix"></div>';
			blocks['switch']+='</div>';
		blocks['switch']+='</a>';
		
	blocks['switch']+='</div>';
blocks['switch']+='</div>';

//PROTECTED
blocks['protected']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['protected']+='<div class="panel panel-block panel-default panel-protected [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['protected']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['protected']+='<div class="row">';
				blocks['protected']+='<div class="col-xs-8">';
					blocks['protected']+='<div class="huge">[CURRENT]</div>';
					blocks['protected']+='<div>[NAME]</div>';
				blocks['protected']+='</div>';
				blocks['protected']+='<div class="col-xs-4 text-right icon">';
					blocks['protected']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['protected']+='</div>';
			blocks['protected']+='</div>';
		blocks['protected']+='</div>';
		blocks['protected']+='<div class="panel-footer">';
			blocks['protected']+='<span class="pull-left">[LANG_LOCKED][CURRENT_DATE]</span>';
			blocks['protected']+='<span class="pull-right"><i class="fa fa-lock"></i></span>';
		blocks['protected']+='<div class="clearfix"></div>';
	blocks['protected']+='</div>';
blocks['protected']+='</div>';

//NO SWITCH AVAILABLE
blocks['noswitch']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['noswitch']+='<div class="panel panel-block panel-default panel-noswitch [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['noswitch']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['noswitch']+='<div class="row">';
				blocks['noswitch']+='<div class="col-xs-8">';
					blocks['noswitch']+='<div class="huge">[CURRENT]</div>';
					blocks['noswitch']+='<div>[NAME]</div>';
				blocks['noswitch']+='</div>';
				blocks['noswitch']+='<div class="col-xs-4 text-right icon">';
					blocks['noswitch']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['noswitch']+='</div>';
			blocks['noswitch']+='</div>';
		blocks['noswitch']+='</div>';
		/*
		blocks['noswitch']+='<a href="javascript:void(0);">';
			blocks['noswitch']+='<div class="panel-footer">';
				blocks['noswitch']+='<span class="pull-left">&nbsp;</span>';
				blocks['noswitch']+='<span class="pull-right"></span>';
				blocks['noswitch']+='<div class="clearfix"></div>';
			blocks['noswitch']+='</div>';
		blocks['noswitch']+='</a>';
		*/
	blocks['noswitch']+='</div>';
blocks['noswitch']+='</div>';

//GROUP
blocks['group']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['group']+='<div class="panel panel-block panel-default panel-group [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['group']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['group']+='<div class="row">';
				blocks['group']+='<div class="col-xs-8">';
					blocks['group']+='<div class="huge">[CURRENT]</div>';
					blocks['group']+='<div>[NAME]</div>';
				blocks['group']+='</div>';
				blocks['group']+='<div class="col-xs-4 text-right icon">';
					blocks['group']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['group']+='</div>';
			blocks['group']+='</div>';
		blocks['group']+='</div>';
		blocks['group']+='<a href="javascript:switchGroup([IDX]);">';
			blocks['group']+='<div class="panel-footer">';
				blocks['group']+='<span class="pull-left">[LANG_SWITCH][CURRENT_DATE]</span>';
				blocks['group']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['group']+='<div class="clearfix"></div>';
			blocks['group']+='</div>';
		blocks['group']+='</a>';		
	blocks['group']+='</div>';
blocks['group']+='</div>';

//PUSH ON BUTTON
blocks['pushbutton']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['pushbutton']+='<div class="panel panel-block panel-default panel-pushbutton [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['pushbutton']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['pushbutton']+='<div class="row">';
				blocks['pushbutton']+='<div class="col-xs-8">';
					blocks['pushbutton']+='<div class="huge">[CURRENT]</div>';
					blocks['pushbutton']+='<div>[NAME]</div>';
				blocks['pushbutton']+='</div>';
				blocks['pushbutton']+='<div class="col-xs-4 text-right icon">';
					blocks['pushbutton']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['pushbutton']+='</div>';
			blocks['pushbutton']+='</div>';
		blocks['pushbutton']+='</div>';
		blocks['pushbutton']+='<a href="javascript:switchDevice([IDX]);">';
			blocks['pushbutton']+='<div class="panel-footer">';
				blocks['pushbutton']+='<span class="pull-left">[LANG_ACTIVATE][CURRENT_DATE]</span>';
				blocks['pushbutton']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['pushbutton']+='<div class="clearfix"></div>';
			blocks['pushbutton']+='</div>';
		blocks['pushbutton']+='</a>';		
	blocks['pushbutton']+='</div>';
blocks['pushbutton']+='</div>';

//SCENE
blocks['scene']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['scene']+='<div class="panel panel-block panel-default panel-scene [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['scene']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['scene']+='<div class="row">';
				blocks['scene']+='<div class="col-xs-8">';
					blocks['scene']+='<div class="huge">[CURRENT]</div>';
					blocks['scene']+='<div>[NAME]</div>';
				blocks['scene']+='</div>';
				blocks['scene']+='<div class="col-xs-4 text-right icon">';
					blocks['scene']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['scene']+='</div>';
			blocks['scene']+='</div>';
		blocks['scene']+='</div>';
		blocks['scene']+='<a href="javascript:switchScene([IDX]);">';
			blocks['scene']+='<div class="panel-footer">';
				blocks['scene']+='<span class="pull-left">[LANG_TURNON][CURRENT_DATE]</span>';
				blocks['scene']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['scene']+='<div class="clearfix"></div>';
			blocks['scene']+='</div>';
		blocks['scene']+='</a>';		
	blocks['scene']+='</div>';
blocks['scene']+='</div>';

//DIMMER
blocks['dimmer']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="device[IDX]">';
	blocks['dimmer']+='<div class="panel panel-block panel-default panel-dimmer [DEVICEACTIVE]" data-idx="[IDX]">';
		blocks['dimmer']+='<div class="panel-heading [HEADERCLASS]">';
			blocks['dimmer']+='<div class="row">';
				blocks['dimmer']+='<div class="col-xs-8">';
					blocks['dimmer']+='<div>[NAME] (<span id="current[IDX]">[CURRENT]</span>%)</div>';
					blocks['dimmer']+='<div>';
					blocks['dimmer']+='<input type="text" class="span2" value="[LEVEL]" id="sl[IDX]" >';
					blocks['dimmer']+='</div>';
				blocks['dimmer']+='</div>';
				blocks['dimmer']+='<div class="col-xs-4 text-right icon">';
					blocks['dimmer']+='<i class="mainicon [ICON] [ICONCLASS]"></i>';
				blocks['dimmer']+='</div>';
			blocks['dimmer']+='</div>';
		blocks['dimmer']+='</div>';
		
		blocks['dimmer']+='<a href="javascript:slideDeviceToggle([IDX]);">';
			blocks['dimmer']+='<div class="panel-footer">';
				blocks['dimmer']+='<span class="pull-left">[LANG_SWITCH][CURRENT_DATE]</span>';
				blocks['dimmer']+='<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>';
				blocks['dimmer']+='<div class="clearfix"></div>';
			blocks['dimmer']+='</div>';
		blocks['dimmer']+='</a>';
		
	blocks['dimmer']+='</div>';
blocks['dimmer']+='</div>';
							
//GRAPHS BLOCK
blocks['graphs'] = '<div class="graph" id="graph[ID]">';
	blocks['graphs']+='<div class="col-lg-12">';
		blocks['graphs']+='<div class="panel panel-default" data-idx="[ID]">';
			blocks['graphs']+='<div class="panel-heading graph"><div class="pull-left">[TITLE]</div><div class="pull-right">';
					blocks['graphs']+='<div class="btn-group">[BUTTONS]</div>';
				blocks['graphs']+='</div><div class="clearfix"></div>';
			blocks['graphs']+='</div>';
			blocks['graphs']+='<div class="panel-body">';
				blocks['graphs']+='<div id="graphoutput[ID]"></div>';
			blocks['graphs']+='</div>';
		blocks['graphs']+='</div>';
	blocks['graphs']+='</div>';
blocks['graphs']+='</div>';
		
//BUIENRADAR BLOCK
blocks['buienradar']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="buienradar">';
	blocks['buienradar']+='<div class="panel panel-default">';
		blocks['buienradar']+='<div class="panel-heading nodetails">';
			blocks['buienradar']+='<div class="row">';
				blocks['buienradar']+='<div class="col-xs-12">';
					blocks['buienradar']+='<div class="huge">[TITLE]</div>';
					blocks['buienradar']+='<div id="graph_radar" style="height: 100px;margin-top:-10px"></div>';
				blocks['buienradar']+='</div>';
			blocks['buienradar']+='</div>';
		blocks['buienradar']+='</div>';
	blocks['buienradar']+='</div>';
blocks['buienradar']+='</div>';
						
//WUNDERGROUND BLOCK
blocks['wunderground']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="wunderground">';
	blocks['wunderground']+='<div class="panel panel-default">';
		blocks['wunderground']+='<div class="panel-heading nodetails">';
			blocks['wunderground']+='<div class="row">';
				blocks['wunderground']+='<div class="col-xs-8">';
					blocks['wunderground']+='<div class="huge">[TITLE]</div>';
					blocks['wunderground']+='<div class="smaller">[CONTENT]</div>';
				blocks['wunderground']+='</div>';
				blocks['wunderground']+='<div class="col-xs-4 text-right" style="padding-left:0px;">';					  
					blocks['wunderground']+='<canvas id="icon_wg" width="56" height="56" style="margin-top:5px;"></canvas>';
				blocks['wunderground']+='</div>';
			blocks['wunderground']+='</div>';
		blocks['wunderground']+='</div>';
	blocks['wunderground']+='</div>';
blocks['wunderground']+='</div>';
				
//LOADING MODAL
blocks['loading'] = '<div class="modal fade" id="loadingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">';
	blocks['loading']+= '<div class="modal-dialog">';
		blocks['loading']+= '<div class="modal-content">';
			blocks['loading']+= '<div class="modal-body">';
				blocks['loading']+= '<h1>One moment please...</h1><br />DO NOT REFRESH THIS PAGE!';
			blocks['loading']+= '</div>';
		blocks['loading']+= '</div>';
	blocks['loading']+= '</div>';
blocks['loading']+= '</div>';
		
//CURRENT TV CHANNEL BLOCK

blocks['currenchannel']='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" id="xbmc-playing">';
	blocks['currenchannel']+='<div class="panel panel-default">';
		blocks['currenchannel']+='<div class="panel-heading">';
			blocks['currenchannel']+='<div class="row">';
				blocks['currenchannel']+='<div class="col-xs-8"><div class="huge">[TITLE]</div></div>';
				//blocks['currenchannel']+='<div class="col-xs-4 text-right" style="padding-left:0px;">';					  
					//blocks['currenchannel']+='<img src="http://bell-vs-rogers.com/channellogos/cid259LOGO_140x_TLChd.png" />';
				//blocks['currenchannel']+='</div>';
			blocks['currenchannel']+='</div>';
		blocks['currenchannel']+='</div>';

		blocks['currenchannel']+='<div class="details">';
			blocks['currenchannel']+='<div class="panel-footer">';
				blocks['currenchannel']+='<span class="pull-left"></span>';
				//blocks['currenchannel']+='<span class="pull-right media"><a href="javascript:backwardMedia();"><i class="fa fa-step-backward"></i></a>&nbsp;&nbsp;<a href="javascript:forwardMedia();"><i class="fa fa-step-forward"></i></a></span>';
				blocks['currenchannel']+='<div class="clearfix"></div>';
			blocks['currenchannel']+='</div>';
		blocks['currenchannel']+='</div>';
	blocks['currenchannel']+='</div>';
blocks['currenchannel']+='</div>';
			

//TOP BAR
blocks['topbar'] = '<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">';
    blocks['topbar']+= '<div class="navbar-header">';
        blocks['topbar']+= '<div class="fl-left">';
            blocks['topbar']+= '<img id="logo" src="" />v<span id="dversion"></span> | ';
        	blocks['topbar']+= '<span class="domoticz"><strong>Domoticz</strong> v<span id="version"></span></span>';
        	blocks['topbar']+= '<span class="floorplans"> | <select onchange="setFloorplan(this.value);"></select></span>';
        	//blocks['topbar']+= '<span class="cameras"> | <select onchange="openCamera(this.value);"></select></span>';
            blocks['topbar']+= '<span id="menu" style="display:none;">';
                if(_HOST_DOMOTICZ!=='') 	blocks['topbar']+= ' | <a href="javascript:void(0);" onclick="showDashboard();">'+lang['dashboard']+'</a> ';
               	if(_HOST_JOINTSPACE!==''){
					var jspcs = _HOST_JOINTSPACE.split(',');
					var tjspcs = 1;
					for(j in jspcs){
						blocks['topbar']+= ' | <a href="javascript:void(0);" onclick="showRemote('+jspcs[j]+');">'+lang['remote']+'';
						if(jspcs.length>1){
							blocks['topbar']+= ' ('+tjspcs+')';
							tjspcs++;	
						}
						blocks['topbar']+= '</a> ';
					}
				}
			blocks['topbar']+= '</span>';                
        blocks['topbar']+= '</div>';
    	blocks['topbar']+= '<div class="fl-right infospans">';
        	if(_SYSTEMINFO==1) blocks['topbar']+= '<span id="systeminfo"></span>';
        	blocks['topbar']+= '<span id="traffic"></span>';
        	blocks['topbar']+= '<span id="sun"></span>';
            blocks['topbar']+= '<span id="settings"><a href="javascript:openSettings();"><i class="fa fa-cog"></i></a></span>';
          	blocks['topbar']+= '<span id="editmode"><a href="javascript:openEditmode();" id="editmode"><i class="fa fa-pencil"></i></a></span>';
    	blocks['topbar']+= '</div>';
    blocks['topbar']+= '</div> ';           
blocks['topbar']+= '</nav>';

//NAVIGATION-BLOCK
blocks['navigation'] = '<nav class="navbar navbar-default navbar-fixed-top">';
	blocks['navigation']+= '<div class="container-fluid">';
		blocks['navigation']+= '<div class="navbar-header">';
			blocks['navigation']+= '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">';
				blocks['navigation']+= '<span class="sr-only">Toggle navigation</span>';
				blocks['navigation']+= '<span class="icon-bar"></span>';
				blocks['navigation']+= '<span class="icon-bar"></span>';
				blocks['navigation']+= '<span class="icon-bar"></span>';
			blocks['navigation']+= '</button>';
			blocks['navigation']+= '<a class="navbar-brand" href="#"><img id="logo" src="" /><div class="version">v<span id="dversion"></span></div></a>';
		blocks['navigation']+= '</div>';
		blocks['navigation']+= '<div id="navbar" class="navbar-collapse collapse">';
			blocks['navigation']+= '<ul class="nav navbar-nav">';
				blocks['navigation']+= '<li><img id="logo" src="" /><div class="version">v<span id="dversion"></span></div></li>';
				blocks['navigation']+= '<li><a href="javascript:void(0);" onclick="showDashboard();"><i class="fa fa-home fa-2x"></i><span class="menu-item">'+lang['dashboard']+'</span></a></li>';
				if(_GRAPHSEPARATE==1) blocks['navigation']+= '<li><a href="javascript:void(0);" onclick="showCharts();"><i class="fa fa-line-chart fa-2x"></i><span class="menu-item">Charts</span></a></li>';
				
				if(_HOST_JOINTSPACE!==''){
					var jspcs = _HOST_JOINTSPACE.split(',');
					var tjspcs = 1;
					for(j in jspcs){
						blocks['navigation']+= '<li><a href="javascript:void(0);" onclick="showRemote(\''+jspcs[j]+'\');"><i class="fa fa-desktop fa-2x"></i><span class="menu-item">'+lang['remote']+'';
						if(jspcs.length>1){
							blocks['navigation']+= ' ('+tjspcs+')';
							tjspcs++;	
						}
						blocks['navigation']+= '</span></a></li>';
					}
				}
						
				blocks['navigation']+= '<li><a href="javascript:void(0);" onclick="openEditmode();" id="editmode"><i class="fa fa-pencil fa-2x"></i><span class="menu-item">'+lang['editmode']+'</span></a></li>';
				blocks['navigation']+= '<li class="last"><a href="javascript:void(0);" onclick="openSettings();"><i class="fa fa-cog fa-2x"></i><span class="menu-item">'+lang['settings']+'</span></a></li>';
			blocks['navigation']+= '</ul>';
			blocks['navigation']+= '<ul class="nav navbar-nav navbar-right">';
				blocks['navigation']+= '<li class="note"><div id="traffic"></div></li>';
				blocks['navigation']+= '<li class="note"><div id="sun"></div></li>';
			blocks['navigation']+= '</ul>';
	
		blocks['navigation']+= '</div><!--/.nav-collapse -->';
	blocks['navigation']+= '</div><!--/.container-fluid -->';
blocks['navigation']+= '</nav>';


//GENERAL WRAPPERS FOR BLOCKS ON DASHBOARD
blocks['blocks'] = '<div id="page-wrapper">';
    blocks['blocks']+= '<div class="row dashboard"></div>';
    if(_GRAPHSEPARATE==1) blocks['blocks']+= '<div class="row graphs" style="opacity:0;"></div>';
    else blocks['blocks']+= '<div class="row graphs"></div>';
    blocks['blocks']+= '<div class="row xbmc" style="display:none;"></div>'; 
    blocks['blocks']+= '<div class="row remote" style="display:none;"></div>'; 
blocks['blocks']+= '</div>';


//SETTINGS BLOCK
blocks['settings'] = '<div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">';
	blocks['settings']+= '<div class="modal-dialog">';
		blocks['settings']+= '<div class="modal-content">';
			blocks['settings']+= '<div class="modal-header">';
				blocks['settings']+= '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
				blocks['settings']+= '<h3 class="modal-title" id="myModalLabel">'+lang['settings_title']+'</h3>';
				blocks['settings']+= '<h5>'+lang['settings_description']+'</h5>';
			blocks['settings']+= '</div>';
			blocks['settings']+= '<div class="modal-body">';
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_theme']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						blocks['settings']+= '<select name="dashticz_theme" class="form-control">';
						
							if(_THEME=='default') blocks['settings']+= '<option value="default" selected>'+lang['settings_theme_default']+'</option>';
							else blocks['settings']+= '<option value="default">'+lang['settings_theme_default']+'</option>';
						
							if(_THEME=='darkoticz') blocks['settings']+= '<option value="darkoticz" selected>Darkoticz</option>';
							else blocks['settings']+= '<option value="darkoticz">Darkoticz</option>';
							
						blocks['settings']+= '</select>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_language']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						blocks['settings']+= '<select name="dashticz_language" class="form-control">';
						
							if(_LANGUAGE=='fr_FR') blocks['settings']+= '<option value="fr_FR" selected>French</option>';
							else blocks['settings']+= '<option value="fr_FR">French</option>';

							if(_LANGUAGE=='de_DE') blocks['settings']+= '<option value="de_DE" selected>Deutsch</option>';
							else blocks['settings']+= '<option value="de_DE">Deutsch</option>';
												
							if(_LANGUAGE=='en_US') blocks['settings']+= '<option value="en_US" selected>English</option>';
							else blocks['settings']+= '<option value="en_US">English</option>';
						
							if(_LANGUAGE=='nl_NL') blocks['settings']+= '<option value="nl_NL" selected>Nederlands</option>';
							else blocks['settings']+= '<option value="nl_NL">Nederlands</option>';
							
						blocks['settings']+= '</select>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_onlyfavorites']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						var favorites='';
						if(_FAVORITES==1) favorites='checked';
						blocks['settings']+= '<input type="checkbox" name="dashticz_onlyfavorites" value="1" '+favorites+' class="form-control" style="width:12px;margin:0;"/>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';	
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_showsysteminfo']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						var systeminfo='';
						if(_SYSTEMINFO==1) systeminfo='checked';
						blocks['settings']+= '<input type="checkbox" name="dashticz_showsysteminfo" value="1" '+systeminfo+' class="form-control" style="width:12px;margin:0;"/>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';	
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_showtrafficinfo']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						var trafficinfo='';
						if(_TRAFFICINFO==1) trafficinfo='checked';
						blocks['settings']+= '<input type="checkbox" name="dashticz_showtrafficinfo" value="1" '+trafficinfo+' class="form-control" style="width:12px;margin:0;"/>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';	
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_graphrefresh']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						blocks['settings']+= '<input type="text" name="dashticz_graphrefresh" value="'+_GRAPHREFRESH+'" class="form-control" />';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';	
			
				blocks['settings']+= '<div class="row">';
					blocks['settings']+= '<label class="col-md-7">'+lang['settings_graphseparate']+'</label>';
					blocks['settings']+= '<div class="col-md-5">';
						var graphseparate='';
						if(_GRAPHSEPARATE==1) graphseparate='checked';
						blocks['settings']+= '<input type="checkbox" name="dashticz_graphseparate" value="1" '+graphseparate+' class="form-control" style="width:12px;margin:0;"/>';
					blocks['settings']+= '</div>';
				blocks['settings']+= '</div>';	
					
			blocks['settings']+= '</div>';
			blocks['settings']+= '<div class="modal-footer">';
				blocks['settings']+= '<button type="button" class="btn btn-default" data-dismiss="modal">'+lang['cancel']+'</button>';
				blocks['settings']+= '<button type="button" class="btn btn-primary" onclick="saveSettings();">'+lang['save']+'</button>';
			blocks['settings']+= '</div>';
		blocks['settings']+= '</div>';
	blocks['settings']+= '</div>';
blocks['settings']+= '</div>';


//EDIT BLOCK
blocks['editblock'] = '<div class="modal fade" id="editblockModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">';
	blocks['editblock']+= '<div class="modal-dialog">';
		blocks['editblock']+= '<div class="modal-content">';
			blocks['editblock']+= '<div class="modal-header">';
				blocks['editblock']+= '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
				blocks['editblock']+= '<h3 class="modal-title" id="myModalLabel">'+lang['blocksettings_title']+'</h3>';
				blocks['editblock']+= '<h5>'+lang['blocksettings_description']+'</h5>';
			blocks['editblock']+= '</div>';
			blocks['editblock']+= '<div class="modal-body">';
			
				blocks['editblock']+= '<div class="row">';
					blocks['editblock']+= '<label class="col-md-3">'+lang['blocksettings_blocktitle']+'</label>';
					blocks['editblock']+= '<div class="col-md-9">';
						blocks['editblock']+= '<input type="text" id="name" class="form-control" />';
					blocks['editblock']+= '</div>';
				blocks['editblock']+= '</div>';
				
				blocks['editblock']+= '<div class="row">';
					blocks['editblock']+= '<label class="col-md-3">'+lang['blocksettings_switchtype']+'</label>';
					blocks['editblock']+= '<div class="col-md-9">';
						blocks['editblock']+= '<select id="switchtype" class="form-control">';
							
							var switchtypes = new Object();
							switchtypes[3] = 'Blinds';
							switchtypes[6] = 'Blinds Inverted';
							switchtypes[13] = 'Blinds Percentage';
							switchtypes[16] = 'Blinds Percentage Inverted';
							switchtypes[2] = 'Contact';
							switchtypes[7] = 'Dimmer';
							switchtypes[11] = 'Door Lock';
							switchtypes[1] = 'Doorbell';
							switchtypes[12] = 'Dusk Sensor';
							switchtypes[8] = 'Motion Sensor';
							switchtypes[0] = 'On/Off';
							switchtypes[10] = 'Push Off Button';
							switchtypes[9] = 'Push On Button';
							switchtypes[5] = 'Smoke Detector';
							switchtypes[15] = 'Venetian Blinds EU';
							switchtypes[14] = 'Venetian Blinds US';
							switchtypes[4] = 'X10 Siren';
							
							for(st in switchtypes){
								blocks['editblock']+= '<option value="'+st+'">'+switchtypes[st]+'</option>';
							}
							

						blocks['editblock']+= '</select>';
					blocks['editblock']+= '</div>';
				blocks['editblock']+= '</div>';	
			
				blocks['editblock']+= '<div class="row">';
					blocks['editblock']+= '<label class="col-md-3">'+lang['blocksettings_hide']+'</label>';
					blocks['editblock']+= '<div class="col-md-9">';
						blocks['editblock']+= '<input type="checkbox" id="hide" class="form-control" style="width:12px;margin:0;"/>';
					blocks['editblock']+= '</div>';
				blocks['editblock']+= '</div>';			
					
			blocks['editblock']+= '</div>';
			blocks['editblock']+= '<div class="modal-footer">';
				blocks['editblock']+= '<button type="button" class="btn btn-default" data-dismiss="modal">'+lang['cancel']+'</button>';
				blocks['editblock']+= '<button type="button" class="btn btn-primary" onclick="saveEditblock();">'+lang['save']+'</button>';
			blocks['editblock']+= '</div>';
		blocks['editblock']+= '</div>';
	blocks['editblock']+= '</div>';
blocks['editblock']+= '</div>';