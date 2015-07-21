/*
 * 	Plots
 *
 */

var el_bc1 = $("#bgd_basic_concept_1")[0];
var el_bc2 = $("#bgd_basic_concept_2")[0];
var el_bc3 = $("#bgd_basic_concept_3")[0];

var el_li = $("#lin_input")[0];
var el_lo = $("#lin_output")[0];

var cv_width=el_bc1.offsetWidth;			// canvas size
var graph_width=0.3*cv_width;
var cv_height=el_bc1.offsetHeight;
var graph_height=0.5*cv_height;

var inv_lowlevel= new Array(0.7,0.8,0.5,0.4);
var order_array= new Array(0.1,0.3,0.4,0.55,0.35,0.23);
var all_order= new Array(0.4,0.5,0.2,0.1,0.3,0.4,0.55,0.35,0.23);
var all_order2= new Array(0.32,0.35,0.37,0.33,0.29,0.25,0.3,0.32,0.25);
window.onload = function() {
	// ============== draw inv ==============
	draw_inv();
	//============== draw order policy ==============
	draw_op();
	// ============== order seq ==============
	draw_oseq();
	// ============== order seq ==============
	draw_sin_input();
	draw_sin_output();
}

document.addEventListener("impress:substep-enter", function (event) {
	var step_id = $(".step.active").attr("id");
	var substep_id
	switch(data_id) {
		case "bgd_basic_concept_1":
			substep_id = $("#order_qt.substep.present.active").attr("id");
			if (substep_id=="order_qt") {
				// show order quantity
				order_qt.animate({'opacity':1},1000);
				inv_path_vert.animate({'stroke-width':9,'stroke':'#de6127'},1000,'elastic');
			};
			break;
		case "bgd_basic_concept_2":
			substep_id = $("#boom_ylabel.substep.present.active").attr("id");
			if (substep_id=="boom_ylabel") {
				// show order bar
				olabel_inv.animate({'transform':'...s1.25'},250,'<>',function (){
					olabel_inv.animate({'transform':'...s0.8'},250,'<>')
				});
				ylabel_op.animate({'transform':'...s1.25'},250,'<>',function (){
					ylabel_op.animate({'transform':'...s0.8'},250,'<>')
				});
			};
			substep_id = $("#boom_xlabel.substep.present.active").attr("id");
			if (substep_id=="boom_xlabel") {
				// show order bar
				ylabel_inv.animate({'transform':'...s1.25'},250,'<>',function (){
					ylabel_inv.animate({'transform':'...s0.8'},250,'<>')
				});
				xlabel_op.animate({'transform':'...s1.25'},250,'<>',function (){
					xlabel_op.animate({'transform':'...s0.8'},250,'<>')
				});
			};
		case "bgd_basic_concept_3":
			substep_id = $("#boom_ylabel_3.substep.present.active").attr("id");
			if (substep_id=="boom_ylabel_3") {
				// show order bar
				olabel_inv.animate({'transform':'...s1.25'},250,'<>',function (){
					olabel_inv.animate({'transform':'...s0.8'},250,'<>')
				});
				ylabel_sq.animate({'transform':'...s1.25'},250,'<>',function (){
					ylabel_sq.animate({'transform':'...s0.8'},250,'<>')
				});
			};
			substep_id = $("#boom_xlabel_3.substep.present.active").attr("id");
			if (substep_id=="boom_xlabel_3") {
				// show order bar
				xlabel_inv.animate({'transform':'...s1.25'},250,'<>',function (){
					xlabel_inv.animate({'transform':'...s0.8'},250,'<>')
				});
				xlabel_sq.animate({'transform':'...s1.25'},250,'<>',function (){
					xlabel_sq.animate({'transform':'...s0.8'},250,'<>')
				});
			};
			substep_id = $("#order_bar.substep.present.active").attr("id");
			if (substep_id=="order_bar") {
				// show order bar
				oseq_vert.animate({path:oseq_dash_vert_end},1000,'elastic');
			};
			substep_id = $("#extend_time.substep.present.active").attr("id");
			if (substep_id=="extend_time") {
				// show order bar
				$("#bgd_basic_concept_1").css({"opacity":"0"});
				$("#bgd_basic_concept_2").css({"opacity":"0"});
				extend_time_axes();
			};
			substep_id = $("#scale_order.substep.present.active").attr("id");
			if (substep_id=="scale_order") {
				scale_orders();
			};
			substep_id = $("#show_arrow_to_amp.substep.present.active").attr("id");
			if (substep_id=="show_arrow_to_amp") {
				// show the question
				show_arrow_to_amp();
			};
			substep_id = $("#show_question.substep.present.active").attr("id");
			if (substep_id=="show_question") {
				// show the question
				amp_question.animate({'opacity':1},500,"<>")
			};
			break;
		case "linear_approach_1":
			substep_id = $("#change_to_linear.substep.present.active").attr("id");
			if (substep_id=="change_to_linear") {
				// change to linear ordering policy
				line_op.animate({path:"M -"+0.3*graph_height+" 0 l "+1.3*graph_height+" "+
					1.3*graph_height},1000,"<>");
				$("#to_be_optimal, #the_op").animate({'opacity':0});
			};
			break;
		case "linear_approach_2":
			substep_id = $("#lin_show_3d.substep.present.active").attr("id");
			if (substep_id=="lin_show_3d") {
				// show 3d figure
				$("#fig_title_input_freq, #fig_title_output_freq, #lin_input_freq, #lin_output_freq, #bgd_basic_concept_2").css({"opacity":1});
				$("#lin_module_freq, #fig_title_exp_trend").css({"opacity":0});
				// $("#downarrow_lin").css({"-ms-transform":"rotate(0deg)","transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)"})
			};
			substep_id = $("#lin_show_trend.substep.present.active").attr("id");
			if (substep_id=="lin_show_trend") {
				// show trend
				$("#lin_input_freq, #lin_output_freq, #bgd_basic_concept_2").css({"opacity":0});
				$("#lin_module_freq, #fig_title_exp_trend").css({"opacity":1});
				// $("#downarrow_lin").css({"-ms-transform":"rotate(180deg)","transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)"})
			};
			break;
		case "nonlinear_approach_1":
			substep_id = $("#change_to_nonlinear.substep.present.active").attr("id");
			if (substep_id=="change_to_nonlinear") {
				// change to linear ordering policy
				var non_lin_str=['M',0.05*graph_width,0.3*graph_height];
				non_lin_str.push('R')
				var non_lin_array=new Array(0.7,0.85,0.9)
				for (var i = 0; i <= non_lin_array.length-1; i++) {
					non_lin_str.push((i+1)/(non_lin_array.length+1)*graph_width);
					non_lin_str.push(non_lin_array[i]*graph_height);
				};
				line_dash.hide();
				line_op.animate({path:non_lin_str},1000,"<>");
			};
			break;
		case "nonlinear_approach_2":
			substep_id = $("#nonlin_show_3d.substep.present.active").attr("id");
			if (substep_id=="nonlin_show_3d") {
				// show 3d figure
				$("#fig_title_input_freq, #fig_title_output_freq, #lin_input_freq, #lin_output_freq, #bgd_basic_concept_2").css({"opacity":1});
				$("#lin_module_freq, #fig_title_exp_trend").css({"opacity":0});
				$("#downarrow_lin").css({"-ms-transform":"rotate(0deg)","transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)"})
			};
			substep_id = $("#nonlin_show_trend.substep.present.active").attr("id");
			if (substep_id=="nonlin_show_trend") {
				// show trend
				$("#lin_input_freq, #lin_output_freq, #bgd_basic_concept_2").css({"opacity":0});
				$("#lin_module_freq, #fig_title_exp_trend").css({"opacity":1});
				$("#downarrow_lin").css({"-ms-transform":"rotate(180deg)","transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)"})
			};
			break;
		case "gen_res":
			substep_id = $("#gen_res2.substep.present.active").attr("id");
			if (substep_id=="gen_res2") {
				$("#gen_res img").attr({"src":"./images/article/gen_res2.png"});
			};
			substep_id = $("#gen_res3.substep.present.active").attr("id");
			if (substep_id=="gen_res3") {
				$("#gen_res img").attr({"src":"./images/article/gen_res3.png"});
			};
			break;
		case "spec_case":
			substep_id = $("#spec_case2.substep.present.active").attr("id");
			if (substep_id=="spec_case2") {
				$("#spec_case img").attr({"src":"./images/article/spec_case2.png"});
			};
			substep_id = $("#spec_case3.substep.present.active").attr("id");
			if (substep_id=="spec_case3") {
				$("#spec_case img").attr({"src":"./images/article/spec_case3.png"});
			};
			break;
		case "refine":
			substep_id = $("#refine_show_simple.substep.present.active").attr("id");
			if (substep_id=="refine_show_simple") {
				$("#refine_margin_eq").animate({"opacity":1});
			};
			substep_id = $("#refine_show_right.substep.present.active").attr("id");
			if (substep_id=="refine_show_right") {
				$("#refine_equ_right, #refine_arrow_right").animate({"opacity":1});
			};
			substep_id = $("#refine_show_left.substep.present.active").attr("id");
			if (substep_id=="refine_show_left") {
				$("#refine_equ_left, #refine_arrow_left, #refine_state_left").animate({"opacity":1});
			};
			substep_id = $("#refine_show_inter.substep.present.active").attr("id");
			if (substep_id=="refine_show_inter") {
				$("#refine_state_center, .refine_right_arrow").animate({"opacity":1});
				$("#refine_arrow_centered").animate({"opacity":0});
				$("#refine_equ_centered").animate({"opacity":0});
				$("#refine_equ_left").animate({"opacity":1,left:"10%"});
				$("#refine_equ_right").animate({"opacity":1,right:"10%"});
			};
			substep_id = $("#refine_show_final_eq.substep.present.active").attr("id");
			if (substep_id=="refine_show_final_eq") {
				$("#refine_arrow_left, #refine_arrow_right").animate({"opacity":0});
				$("#refine_arrow_centered").animate({"opacity":1});
				$("#refine_equ_right").animate({right:"30%",opacity:0},1000,"easeInOutCubic");
				$("#refine_equ_left").animate({left:"30%",opacity:0},1000,"easeInOutCubic",function () {
					$("#refine_equ_centered").animate({"opacity":1});
				})
			};
			break;
		// case "refine":
		// 	substep_id = $("#refine2.substep.present.active").attr("id");
		// 	if (substep_id=="refine2") {
		// 		$("#refine img").attr({"src":"./images/article/refine2.png"});
		// 	};
		// 	substep_id = $("#refine3.substep.present.active").attr("id");
		// 	if (substep_id=="refine3") {
		// 		$("#refine img").attr({"src":"./images/article/refine3.png"});
		// 	};
		// 	substep_id = $("#refine4.substep.present.active").attr("id");
		// 	if (substep_id=="refine4") {
		// 		$("#refine img").attr({"src":"./images/article/refine4.png"});
		// 	};
		// 	substep_id = $("#refine5.substep.present.active").attr("id");
		// 	if (substep_id=="refine5") {
		// 		$("#refine img").attr({"src":"./images/article/refine5.png"});
		// 	};
		// 	substep_id = $("#refine6.substep.present.active").attr("id");
		// 	if (substep_id=="refine6") {
		// 		$("#refine img").attr({"src":"./images/article/refine6.png"});
		// 	};
		// 	substep_id = $("#refine7.substep.present.active").attr("id");
		// 	if (substep_id=="refine7") {
		// 		$("#refine img").attr({"src":"./images/article/refine7.png"});
		// 	};
		// 	substep_id = $("#refine8.substep.present.active").attr("id");
		// 	if (substep_id=="refine8") {
		// 		$("#refine img").attr({"src":"./images/article/refine8.png"});
		// 	};
		// 	break;
	}
}, false);

// document.addEventListener("impress:stepenter", function (event) {
//     var data_id = $(".step.active").attr("id");

//     // corresponding animations in each active page
//     switch(data_id) {
// 	    case "res_goal":
// 	    	draw_oseq();
// 	    	scale_orders();
// 	    	show_arrow_to_amp();
// 	    	amp_arrow_a2.hide();
// 	    	break;
//     };
// }, false);

var cv_width_sin=el_li.offsetWidth;			// canvas size
var graph_width_sin=0.5*cv_width_sin;
var cv_height_sin=el_li.offsetHeight;
var graph_height_sin=0.5*cv_height_sin;

function draw_sin_input(){
	var sin_input = new Raphael(el_li,cv_width_sin,cv_height_sin);
	var axes = sin_input.path("M 0 0 l 0 "+graph_height_sin+" l "+graph_width_sin+" 0");
	axes.attr(
	    {
	        'stroke-width': 2,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	var ylabel_sin= sin_input.text(-10,0,"Order\nquantity")
	ylabel_sin.attr({
	       'text-anchor': 'end',
	});
	var xlabel_sin= sin_input.text(1*graph_width_sin,1.25*graph_height_sin,"Time")
	xlabel_sin.attr({
	       'text-anchor': 'middle',
	});
	sin_input.set(xlabel_sin,ylabel_sin).attr({
			'font-size': 20,
			'font-family': 'Source Sans Pro'
	})
	// sin curve

	var amp=0.1, omega=4*Math.PI,nSample=20;
	var sin_wave_str=['M',0,0.5*graph_height_sin];
	sin_wave_str.push('R')
	for (var i = 1; i <= nSample; i++) {
		sin_wave_str.push(i/nSample*graph_width_sin);
		sin_wave_str.push((0.5-amp*Math.sin(omega*i/nSample))*graph_height_sin);
	};
	var sin_wave=sin_input.path(sin_wave_str);
	sin_wave.attr({
		'stroke-width':4,
		stroke: '#5c3317'
	})
	// fig title
	var fig_title=sin_input.text(0.5*graph_width_sin,-20,'Stage n')
	fig_title.attr({
	       'text-anchor': 'middle',
	       'font-size': 20,
	       'font-family': 'Source Sans Pro',
	       'opacity':0
	});
	var group_sin=sin_input.set(axes,xlabel_sin,ylabel_sin,sin_wave,fig_title);
	group_sin.attr(
		{
			transform: "T"+0.75*(cv_width_sin-graph_width_sin)+","+0.5*(cv_height_sin-graph_height_sin)
		}
	);
}

function draw_sin_output(){
	var sin_input = new Raphael(el_lo,cv_width_sin,cv_height_sin);
	var axes = sin_input.path("M 0 0 l 0 "+graph_height_sin+" l "+graph_width_sin+" 0");
	axes.attr(
	    {
	        'stroke-width': 2,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	var ylabel_sin= sin_input.text(-10,0,"Order\nquantity")
	ylabel_sin.attr({
	       'text-anchor': 'end',
	});
	var xlabel_sin= sin_input.text(1*graph_width_sin,1.25*graph_height_sin,"Time")
	xlabel_sin.attr({
	       'text-anchor': 'middle',
	});
	sin_input.set(xlabel_sin,ylabel_sin).attr({
			'font-size': 20,
			'font-family': 'Source Sans Pro'
	})
	// sin curve

	var amp=0.25, omega=4*Math.PI,nSample=20;
	var sin_wave_str=['M',0,0.5*graph_height_sin];
	sin_wave_str.push('R')
	for (var i = 1; i <= nSample; i++) {
		sin_wave_str.push(i/nSample*graph_width_sin);
		sin_wave_str.push((0.5-amp*Math.sin(omega*i/nSample))*graph_height_sin);
	};
	sin_wave=sin_input.path(sin_wave_str);
	sin_wave.attr({
		'stroke-width':4,
		stroke: '#5c3317'
	})
	// fig title
	var fig_title=sin_input.text(0.5*graph_width_sin,-20,'Stage n+1')
	fig_title.attr({
	       'text-anchor': 'middle',
	       'font-size': 20,
	       'font-family': 'Source Sans Pro',
	       'opacity':0
	});

	var group_sin=sin_input.set(axes,xlabel_sin,ylabel_sin,sin_wave,fig_title);
	group_sin.attr(
		{
			transform: "T"+0.5*(cv_width_sin-graph_width_sin)+","+0.5*(cv_height_sin-graph_height_sin)
		}
	);
}

function change_sin_output(){
	var amp=new Array(0.25,0.15,0.1,0.05);
	var omega=new Array(4*Math.PI,6*Math.PI,8*Math.PI,10*Math.PI);;
	var nSample=20;
	var sin_wave_str=['M',0,0.5*graph_height_sin];
	sin_wave_str.push('R')
	for (var i = 1; i <= nSample; i++) {
		var y_amp=0;
		for (var j = 0; j < omega.length; j++) {
			y_amp+=amp[j]*Math.sin(omega[j]*i/nSample+j/5)
		};
		sin_wave_str.push(i/nSample*graph_width_sin);
		sin_wave_str.push((0.5-y_amp)*graph_height_sin);
	};
	sin_wave.attr({"path":sin_wave_str});
}

function extend_time_axes(){
	axessq.animate({path:"M 0 0 l 0 "+graph_height+" l "+2.5*graph_width+" 0"},1000,"linear");
	xlabel_sq.animate({'transform':"...T"+1.5*graph_width+",0"},1000,"linear");
	label_omit.animate({'opacity':1});
	// xlabel_sq.animate({'transform':"T"+1.75*graph_width+","+0.5*(cv_height-graph_height)},1000,"linear");
	var bar_delay=0;
	var bar_show = Raphael.animation({'opacity':1},200,"<>");
	group_order.forEach(function(el){
			el.animate(bar_show.delay(bar_delay))
			bar_delay+=1300/6;
	})
	order_curve.animate(bar_show.delay(bar_delay));
}

function scale_orders(){
	shift_x=0.15*(cv_width-graph_width);
	shift_y=0.5*(cv_height-graph_height);
	var scale_center=axessq.getPointAtLength(0);
	scale_center.x+=shift_x/2;
	scale_center.y+=shift_y/2;
	group_toleft = ordersq.set(axessq,order_curve,order_curve2,
		amp_marker,amp_marker2,subfig_title,subfig_title2,amp_avg,amp_avg2,amp_avg_text,amp_avg_text2);
	group_tohide = ordersq.set(oseq_vert,oseq_label1,group_order,oseq_label2,label_omit);
	group_tohide.animate({'opacity':0},500,"<>",function (){
		// ylabel_sq.animate({'transform':'s0.75t'+0.13*(cv_width-graph_width)+
		// 	','+0.38*(cv_height-graph_height)},2000,"<>");
		// xlabel_sq.animate({'transform':'s0.75t'+0.24*(cv_width-graph_width)+
		// 	',-'+0.35*(cv_height-graph_height)},2000,"<>");
		group_toleft.animate({'transform':'...S0.5,0.5,'+scale_center.x+','+scale_center.y},1500,"<>");
		var xlabel_shift_x=-(2.5*graph_width+shift_x-scale_center.x)*0.5
		var xlabel_shift_y=-(graph_height+shift_y-scale_center.y+40)*0.5
		xlabel_sq.animate({'transform':'...s0.75T'+xlabel_shift_x+','+xlabel_shift_y},1500,"<>");
		var ylabel_shift_x=-(shift_x-scale_center.x+40)*0.5
		var ylabel_shift_y=-(shift_y-scale_center.y)*0.5
		ylabel_sq.animate({'transform':'...s0.75T'+ylabel_shift_x+','+ylabel_shift_y},1500,"<>",
			function(){
				group_stage1=ordersq.set(axessq,xlabel_sq,ylabel_sq);
				group_stage2=group_stage1.clone();
				group_stage2.push(order_curve2);
				group_stage2.push(amp_marker2);
				group_stage2.push(subfig_title2);
				group_stage2.push(amp_avg2);
				group_stage2.push(amp_avg_text2);
				group_stage2.animate({'transform':'...T0,'+graph_height,'opacity':1},1000,"<>");
				ordersq.set(amp_marker,amp_avg,amp_avg_text,subfig_title).animate({'opacity':1},1000,"<>");
			});

	})
	// console.log(scale_center);
}

function show_arrow_to_amp() {
	group_amp.animate({'opacity':1},200,"<>");
}

function draw_inv() {
	var inv = new Raphael(el_bc1,cv_width,cv_height);
	var axes = inv.path("M 0 0 l 0 "+graph_height+" l "+graph_width+" 0");
	axes.attr(
	    {
	        'stroke-width': 3,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	inv_level=inv.path("M 0 "+0.3*graph_height+" l "+graph_width+" 0");
	inv_level.attr({
			'stroke-width': 2,
			'stroke-dasharray': '--'
	})
	var inv_path_slope_str=""
	var inv_path_vert_str=""
	var inv_dash_vert_str=""
	var inv_label1=inv.set()
	var inv_label2=inv.set()
	for (var i = inv_lowlevel.length - 1; i >= 0; i--) {
		inv_path_slope_str+="M "+i/4*graph_width+" "+0.3*graph_height+" r "+
						1/12*graph_width+" "+(inv_lowlevel[i]-0.3)*0.4*graph_height+" "+
						2/12*graph_width+" "+(inv_lowlevel[i]-0.3)*0.6*graph_height+" "+
						3/12*graph_width+" "+(inv_lowlevel[i]-0.3)*graph_height+" ";
		if (i>0) {
			inv_path_vert_str+="M "+i/4*graph_width+" "+0.3*graph_height+" l 0 "+
						(inv_lowlevel[i-1]-0.3)*graph_height+" ";
			inv_dash_vert_str+="M "+i/4*graph_width+" "+
						inv_lowlevel[i-1]*graph_height+" l 0 "+
						(1-inv_lowlevel[i-1])*graph_height+" ";
			inv_label1.push(inv.text(i/4*graph_width,graph_height+20,i));
			inv_label2.push(inv.text(i/4*graph_width+12,graph_height+20,"T"));
		};
	};
	inv.set(inv_label1,inv_label2).attr({
	       'text-anchor': 'middle',
	       'font-size': 25,
	       'font-family': 'Source Sans Pro',
	});
	inv_label2.attr({
	       'font-style': 'italic',
	});
	var inv_path_slope=inv.path(inv_path_slope_str);
	inv_path_vert=inv.path(inv_path_vert_str);
	var inv_dash_vert=inv.path(inv_dash_vert_str);
	inv_path_slope.attr({
			'stroke-width': 5,
	})
	inv_path_vert.attr({
			'stroke-width': 5,
	})
	inv_dash_vert.attr({
			'stroke-width': 2,
			'stroke-dasharray': '--'
	})
	label_inv= inv.text(-20,0.3*graph_height,"Order-up-to\nlevel")
	label_inv.attr({
	       'text-anchor': 'end',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro'
	});
	ylabel_inv= inv.text(20,0,"Inventory")
	ylabel_inv.attr({
	       'text-anchor': 'start',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro'
	});
	xlabel_inv= inv.text(graph_width,graph_height+40,"Time")
	xlabel_inv.attr({
	       'text-anchor': 'middle',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro',
	       'fill': "#4682B4"
	});
	var group_line=inv.set(axes, inv_level, inv_path_vert,inv_dash_vert,
		inv_path_slope)
	group_line.attr(
		{
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			stroke: '#5c3317',
		}
	);
	axes.attr(
	    {
	        stroke: '#000',
	    }
	);
	// order quantity

	var order_qt_arrow=inv.path(["M",-0.1*graph_width,0.7*graph_height,
				"Q",0,(0.15+inv_lowlevel[0]/2)*graph_height,
				0.25*graph_width,(0.15+inv_lowlevel[0]/2)*graph_height])

	order_qt_arrow.attr({
			'stroke-width': 2,
			'stroke': '#de6127',
			'stroke-dasharray': '--',
			'arrow-end': 'classic-wide-long',
	})
	olabel_inv= inv.text(-0.1*graph_width-20,0.7*graph_height+10,"Order\nquantity")
	olabel_inv.attr({
	       'text-anchor': 'end',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro',
	       'fill': '#de6127',
	       'stroke': 'none'
	});
	order_qt=inv.set(olabel_inv,order_qt_arrow);
	// group all
	var group_inv = inv.set(axes, inv_level, inv_path_vert,inv_dash_vert,
		inv_label1,inv_label2,inv_path_slope, label_inv, xlabel_inv,
		ylabel_inv,order_qt_arrow,olabel_inv);
	group_inv.attr(
		{
			transform: "T"+0.5*(cv_width-graph_width)+","+0.5*(cv_height-graph_height)
		}
	);
	order_qt.attr({'opacity':0})
}

function draw_op() {
	var orderp = new Raphael(el_bc2,cv_width,cv_height);
	var axesp = orderp.path("M 0 0 l 0 "+graph_height+" l "+graph_width+" 0");
	axesp.attr(
	    {
	        'stroke-width': 3,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	var line_op_str="M 0 "+0.3*graph_height+" l "+0.7*graph_height+" "+
					0.7*graph_height+" l "+0.3*graph_height+" 0";
	line_dash=orderp.path("M -"+0.3*graph_height+" 0 l "+1*graph_height+" "+
					1*graph_height);
	line_dash.attr(
	    {
	    	stroke: '#5c3317',
	        'stroke-width': 2,
	        'stroke-dasharray': '--',
	        'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
	    }
	);
	line_op=orderp.path(line_op_str);
	line_op.attr(
	    {
	    	stroke: '#5c3317',
	        'stroke-width': 7.5,
	        'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
	    }
	);
	var label_op= orderp.text(-30,0.15*cv_height,"Order-up-to\n level")
	label_op.attr({
	       'text-anchor': 'end',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro'
	});
	ylabel_op= orderp.text(20,0,"Order\nquantity")
	ylabel_op.attr({
	       'text-anchor': 'start',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro',
	       'fill': '#de6127',
	});
	xlabel_op= orderp.text(graph_width,graph_height+40,"Inventory")
	xlabel_op.attr({
	       'text-anchor': 'middle',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro'
	});
	var group_op = orderp.set(axesp, line_op,line_dash,label_op,ylabel_op,xlabel_op);
	group_op.attr(
		{
			transform: "T"+0.85*(cv_width-graph_width)+","+0.5*(cv_height-graph_height)
		}
	);
}

function draw_oseq() {
	ordersq = new Raphael(el_bc3,cv_width,cv_height);
	axessq = ordersq.path("M 0 0 l 0 "+graph_height+" l "+graph_width+" 0");
	axessq.attr(
	    {
	        'stroke-width': 3,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	oseq_dash_vert_start=""
	oseq_dash_vert_end=""
	oseq_label1=ordersq.set()
	oseq_label2=ordersq.set()
	for (var i = inv_lowlevel.length - 1; i >= 0; i--) {
		if (i>0) {
			oseq_dash_vert_start+="M "+i/4*graph_width+" "+
						graph_height+" l 0 0 ";
			oseq_dash_vert_end+="M "+i/4*graph_width+" "+
						(1.3-inv_lowlevel[i-1])*graph_height+" l 0 "+
						(inv_lowlevel[i-1]-0.3)*graph_height+" ";
			oseq_label1.push(ordersq.text(i/4*graph_width,graph_height+20,i));
			oseq_label2.push(ordersq.text(i/4*graph_width+12,graph_height+20,"T"));
		};
	};
	label_omit=ordersq.text(graph_width,graph_height+10,"...");
	label_omit.attr({'opacity':0});
	ordersq.set(oseq_label1,oseq_label2,label_omit).attr({
	       'text-anchor': 'middle',
	       'font-size': 25,
	       'font-family': 'Source Sans Pro',
	});
	oseq_label2.attr({
	       'font-style': 'italic',
	});
	oseq_vert=ordersq.path(oseq_dash_vert_start);
	oseq_vert.attr({
			'stroke-width': 9,
	})
	ylabel_sq= ordersq.text(20,0,"Order\nquantity")
	ylabel_sq.attr({
	       'text-anchor': 'start',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro',
	       'fill': '#de6127',
	});
	xlabel_sq= ordersq.text(graph_width,graph_height+40,"Time")
	xlabel_sq.attr({
	       'text-anchor': 'middle',
	       'font-size': 30,
	       'font-family': 'Source Sans Pro',
	       'fill': "#4682B4"
	});
	//order array
	group_order=ordersq.set();
	for (var i = 0; i <= order_array.length - 1; i++) {
		group_order.push(ordersq.path(["M",(4+i)/4*graph_width,graph_height,
			"l",0,-1*order_array[i]*graph_height]));
	};
	group_order.attr({
			'stroke-width': 5,
			'opacity':0
	})
	//order curve
	order_curve_str=['M', 1/4*graph_width, (1-all_order[0])*graph_height];
	order_curve_str2=['M', 1/4*graph_width, (1-all_order2[0])*graph_height];
	order_curve_str.push('R');
	order_curve_str2.push('R');
	for (var i = 1; i < all_order.length; i++) {
		order_curve_str.push((i+1)/4*graph_width);
		order_curve_str2.push((i+1)/4*graph_width);
		order_curve_str.push((1-all_order[i])*graph_height);
		order_curve_str2.push((1-all_order2[i])*graph_height);
	};
	order_curve=ordersq.path(order_curve_str);
	order_curve2=ordersq.path(order_curve_str2);
	ordersq.set(order_curve,order_curve2).attr(
	    {
	    	stroke: '#5c3317',
	        'stroke-width': 2,
	        'stroke-dasharray': '--',
	        'opacity':0
	    }
	);
	var group_line=ordersq.set(axessq, oseq_vert,group_order)
	group_line.attr(
		{
			'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			stroke: '#5c3317',
		}
	);
	ordersq.set(oseq_vert,group_order).attr({
			'stroke-width': 9,
			'stroke': '#de6127',
	})
	axessq.attr(
	    {
	        stroke: '#000',
	    }
	);

	// console.log(Math.max.apply(Math, all_order))
	var ind_max = all_order.indexOf(Math.max.apply(Math, all_order));
	var ind_min = all_order.indexOf(Math.min.apply(Math, all_order));
	amp_marker_max=ordersq.path(['M',(ind_max+1)/4*graph_width,(1-all_order[ind_max])*graph_height,
		(all_order.length+0.5)/4*graph_width,(1-all_order[ind_max])*graph_height]);
	amp_marker_min=ordersq.path(['M',(ind_min+1)/4*graph_width,(1-all_order[ind_min])*graph_height,
		(all_order.length+0.5)/4*graph_width,(1-all_order[ind_min])*graph_height]);
	amp_marker_text=ordersq.text((all_order.length+0.5)/4*graph_width,
		(1-0.5*all_order[ind_max]-0.5*all_order[ind_min])*graph_height,"A2")
	amp_marker_text.attr({
	       'text-anchor': 'start',
	       'font-size': 45,
	       'font-family': 'Source Sans Pro'
	});
	amp_marker=ordersq.set(amp_marker_max,amp_marker_min,amp_marker_text)

	var ind_max2 = all_order2.indexOf(Math.max.apply(Math, all_order2));
	var ind_min2 = all_order2.indexOf(Math.min.apply(Math, all_order2));
	amp_marker_max2=ordersq.path(['M',(ind_max2+1)/4*graph_width,(1-all_order2[ind_max2])*graph_height,
		(all_order2.length+0.5)/4*graph_width,(1-all_order2[ind_max2])*graph_height]);
	amp_marker_min2=ordersq.path(['M',(ind_min2+1)/4*graph_width,(1-all_order2[ind_min2])*graph_height,
		(all_order2.length+0.5)/4*graph_width,(1-all_order2[ind_min2])*graph_height]);
	amp_marker_text2=ordersq.text((all_order2.length+0.5)/4*graph_width,
		(1-0.5*all_order2[ind_max2]-0.5*all_order2[ind_min2])*graph_height,"A1")
	amp_marker_text2.attr({
	       'text-anchor': 'start',
	       'font-size': 45,
	       'font-family': 'Source Sans Pro'
	});
	amp_marker2=ordersq.set(amp_marker_max2,amp_marker_min2,amp_marker_text2)

	// subfig title
	subfig_title=ordersq.text(1.25*graph_width,-20,'Stage n2 (supplier)')
	subfig_title2=ordersq.text(1.25*graph_width,-20,'Stage n1 (customer)')
	ordersq.set(subfig_title,subfig_title2).attr({
	       'text-anchor': 'middle',
	       'font-size': 45,
	       'font-family': 'Source Sans Pro',
	       'opacity':0
	});
	ordersq.set(amp_marker,amp_marker2).attr({'opacity':0})
	// group all
	group_seq = ordersq.set(axessq, oseq_vert,
		oseq_label1,oseq_label2,xlabel_sq,ylabel_sq,group_order,
		order_curve,order_curve2,
		amp_marker,amp_marker2,subfig_title,subfig_title2,label_omit);
	group_seq.attr(
		{
			transform: "T"+0.15*(cv_width-graph_width)+","+0.5*(cv_height-graph_height)
		}
	);

	// draw amplitude curve
	axesamp = ordersq.path("M 0 0 l 0 "+1.25*graph_height+" l "+1.25*graph_width+" 0");
	axesamp.attr(
	    {
	        'stroke-width': 3,
	        'arrow-start': 'classic-wide-long',
	        'arrow-end': 'classic-wide-long'
	    }
	);
	ylabel_amp= ordersq.text(20,0,"Amplitudes")
	ylabel_amp.attr({
	       'text-anchor': 'start',
	});
	xlabel_amp= ordersq.text(1.2*graph_width,1.25*graph_height+40,"Stages")
	xlabel_amp.attr({
	       'text-anchor': 'middle',
	});
	ordersq.set(xlabel_amp,ylabel_amp).attr({
			'font-size': 30,
			'font-family': 'Source Sans Pro'
	})
	all_amp=new Array(0.2,0.5,0.8,0.95,1)
	//order curve
	amp_curve_str=['M', 0, 1.25*graph_height];
	amp_curve_str.push('R');
	for (var i = 0; i < all_amp.length; i++) {
		amp_curve_str.push((i+1)*1.25/(all_amp.length)*graph_width);
		amp_curve_str.push((1.25-all_amp[i])*graph_height);
	};
	amp_curve=ordersq.path(amp_curve_str);
	amp_dash=ordersq.path(['M',
		(2+1)*1.25/(all_amp.length)*graph_width,(1.25-all_amp[2])*graph_height,
		(2+1)*1.25/(all_amp.length)*graph_width,(1.25)*graph_height,
		'M',
		(1+1)*1.25/(all_amp.length)*graph_width,(1.25-all_amp[1])*graph_height,
		(1+1)*1.25/(all_amp.length)*graph_width,(1.25)*graph_height])
	amp_curve.attr({
		'stroke-dasharray':'--',
		'stroke-width':3,
		stroke: '#de6127',
	})
	amp_dash.attr({
		'stroke-width':3
	})
	amp_avg=ordersq.path(['M',0,0.75*graph_height,0.9*2.5*graph_width,0.75*graph_height])
	amp_avg_text=ordersq.image("./images/uinf.png",-90,0.75*graph_height,70,70)
	amp_avg_text2=ordersq.image("./images/uinf.png",-90,0.7*graph_height,70,70)

	amp_avg2=ordersq.path(['M',0,0.7*graph_height,0.9*2.5*graph_width,0.7*graph_height])
	ordersq.set(amp_dash,amp_avg,amp_avg2).attr(
	    {
	    	stroke: '#5c3317',
	        'opacity':1
	    }
	);
	ordersq.set(amp_avg,amp_avg2).attr({
		'stroke-dasharray':'--',
		'stroke-width':1,
		'opacity':0
	})

	amp_label_a2= ordersq.text((2+1)*1.25/(all_amp.length)*graph_width,(1.25-all_amp[2])*graph_height-20,"A2")
	amp_label_a1= ordersq.text((1+1)*1.25/(all_amp.length)*graph_width,(1.25-all_amp[1])*graph_height-20,"A1")
	amp_label_n2= ordersq.text((2+1)*1.25/(all_amp.length)*graph_width,(1.25)*graph_height+20,"n2")
	amp_label_n1= ordersq.text((1+1)*1.25/(all_amp.length)*graph_width,(1.25)*graph_height+20,"n1")
	amp_labels=ordersq.set(amp_label_a2,amp_label_a1,amp_label_n2,amp_label_n1)
	amp_labels.attr({
	    'font-size': 25,
		'font-family': 'Source Sans Pro'
	});
	ordersq.set(amp_label_a2,amp_label_a1).attr({
	    'text-anchor':'end'
	});
	ordersq.set(amp_label_n2,amp_label_n1).attr({
	    'text-anchor':'middle'
	});

	// the question
	amp_question= ordersq.text(1.25/2*graph_width,-0.25*graph_height,'How to predict this trend?')
	amp_question.attr({
		'font-size': 40,
		'font-family': 'Source Sans Pro',
		'font-weight': 500,
		'fill':'#de6127'
	})
	ordersq.set(amp_avg,amp_avg2,amp_avg_text,amp_avg_text2).attr({
		transform: "T"+0.15*(cv_width-graph_width)+","+0.5*(cv_height-graph_height),
		'opacity':0
	})
	group_amp = ordersq.set(axesamp, xlabel_amp, ylabel_amp,amp_curve,amp_dash,amp_labels);
	ordersq.set(group_amp,amp_question).attr(
		{
			transform: "T"+0.6*cv_width+","+0.5*(cv_height-graph_height),
			opacity:0
		}
	);

}

// function runloop() {
//    tetronimo.animate({transform: "R360,250,250"}, 2000, 'elastic',
//    		function() {
//     	this.attr({transform: ""}); // Reset
//         setTimeout(runloop);
// 		});
// };

// document.addEventListener("impress:stepenter", function (event) {
// 	data_id = $(".step.active").attr("id");
// 	if ((data_id=="bgd_basic_concept_1" || data_id=="bgd_basic_concept_3")) {
// 		runloop();
// 	};
// }, false);


// window.onload = function() {
//     var paper = new Raphael(el_bc1, 500, 500);
//     var tetronimo = paper.path("M 250 250 l 0 -50 l -50 0 l 0 -50 l -50 0 l 0 50 l -50 0 l 0 50 z");
//     tetronimo.attr(
//         {
//             gradient: '90-#526c7a-#64a0c1',
//             stroke: '#3b4449',
//             'stroke-width': 10,
//             'stroke-linejoin': 'round',
//             'stroke-linecap': 'round',
//             'stroke-dasharray': '--'
//             // transform: "t0,0"
//         }
//     );
//     tetronimo.mouseover(function() {
//        this.transform('R 180');
//    });
//     // tetronimo.animate({transform: "r360,250,250"}, 2000, 'bounce');
// }

