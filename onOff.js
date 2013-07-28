/*!	* jQuery onOff plugin	*
	*	replace checkbox in iphone style
	*	(c)2013 Polevik Yuriy yr4ik_07@ukr.net	*
*/

$.fn.onOff = function(opt){

 	var opt = $.extend({
		lefttext: 'ON',
		righttext: 'OFF',
		speed: 300,
		boxClass: 'jq-onOff'
	}, opt);

	function onSlide(pb){
		pb.css('left', 0);
		pb.removeClass().addClass('On');
	}
	
	function offSlide(pb, witem){
		pb.css('left', '-'+(witem-2)+'px');
		pb.removeClass().addClass('Off');
	}
	
	return this.each(function(){
		var checkbox = $(this).hide();
		if(checkbox.is(':checkbox')){
			
			var box = $('<div class="'+opt.boxClass+'"></div>').insertAfter(checkbox),
			pb = $('<div/>').appendTo(box).css('position', 'absolute'), 
			on = $('<span class="onOff-left">'+opt.lefttext+'</span>').appendTo(pb),
			slide = $('<div class="onOff-slide"></div>').appendTo(pb).css('position', 'absolute'), 
			off = $('<span class="onOff-right">'+opt.righttext+'</span>').appendTo(pb),
			witem = Math.max(on.outerWidth(), off.outerWidth()),
			wslide = slide.outerWidth(),
			onw = on.width(),
			offw = off.width(),
			stop = false;

			if(onw>offw) off.width(onw); else if(onw<offw) on.width(offw);
			
			box.width(witem+wslide-2);
			pb.width(witem*2+wslide-4);
			
			slide.on('mousedown', function(){
				var pos = 0,
				xpos = box.offset().left,
				boxw = box.outerWidth(),
				move = setTimeout(function(){
					$(document).on('mousemove.onOff', function(e){
						move = false;
						pos = e.pageX-xpos;
						pb.css('left', (pos-witem-2)+'px');
						
						var pos_l = slide.offset().left-xpos,
						pos_r = pos_l + wslide;

						if(pos_l<=0){
							offSlide(pb, witem);
						}else if(pos_r>=boxw) {
							onSlide(pb);
						}else{
							pb.removeClass();
						}
					});
				}, 200);
				
				$(document).one('mouseup', function(ev){
					if(move) {
						clearTimeout(move);
					}else{
						$(document).unbind('mousemove.onOff');
						if($(ev.target).parents('.'+opt.boxClass).length) stop = true;//fix click handler
						res = slide.offset().left-xpos;
						checkbox.prop('checked', (res>(boxw-res-wslide)?true:false)).change();
					}
				});
				return false;
			}).css({'left':'50%', 'margin-left':'-'+(wslide/2)+'px'});
			
			if(checkbox.is(':checked')) onSlide(pb); else offSlide(pb, witem);
			
			checkbox.on('change', function(){
				var check = checkbox.is(':checked');
				if((!check && pb.hasClass('On')) || (check && pb.hasClass('Off')) || !pb.attr('class')){
					pb.removeClass().animate({'left':(check?0:'-'+(witem-2)+'px')}, opt.speed, function(){
						pb.addClass(check ? 'On':'Off');
					});
				}
			});
			
			box.on('click', function(){
				if(!stop) {
					checkbox.prop('checked', !checkbox.is(':checked')).change();
				}else stop = false;
			});

		}
	});
};