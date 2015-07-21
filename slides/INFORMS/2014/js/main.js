/*
 * 	Main effects for the slides
 *
 */

var api = impress();
var intreval;
api.init();

var contentDelay; // delay for listing bullets
var data_id;
var sec_cover_id;


document.addEventListener("impress:stepenter", function (event) {
    data_id = $(".step.active").attr("id");

    // find all ids for section cover page
    sec_cover_id = new Array();
    $(".sec_cover_title").each(function(index){
    	sec_cover_id[index]=$(this).parent().parent().attr("id");
    });
    // Now perform the animation if the active page is section cover
    if ($.inArray(data_id, sec_cover_id) > -1) {// check if the page is a section cover
    	$("#"+data_id+" .sec_cover_title").animate({paddingRight:"0px",opacity:"1"},500); // moving title
    	$("#"+data_id+" .sec_cover_title_hrule").animate({width:"140%",opacity:"0.8"},500); // moving hrule
    	// $("#"+data_id+" .sec_cover_title").css({"padding-right":"0px","opacity":"1"}); //alternative animation
    	hide_header_footer();
    }
    else if (data_id != "cover" && data_id != "contents"){
    	show_header_footer();
    	$("#wrap").css({"overflow":"hidden"})
    }else {hide_header_footer();};
    $(".sec_cover_title").not("#"+data_id).css({"padding-right":"300px","opacity":"0"});
    $(".sec_cover_title_hrule").not("#"+data_id).css({"width":"80%","opacity":"0"});

    // corresponding animations in each active page
    switch(data_id) {
    	case "cover":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$(".left_slide ul li").css({"padding-left":"200px","opacity":"0"});
	    	$("#wrap").css({"overflow":"visible"})
	    	break;
	    case "contents":
	    	// effects for list items flying in
		    contentDelay=0;
	    	$(".left_slide ul li").each(function(){
	    		$(this).delay(contentDelay).animate({paddingLeft:"0px",opacity:"1"},500);
	    		contentDelay+=50;
	    	});
	    	$("#wrap").css({"overflow":"visible"})
	    	break;
	    case "sec_intro":
	    	$("#sec_intro").css({"opacity":"1"});
	    	break;
	    case "background_1":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	// $("#sec_intro").css({"opacity":"0.1"});

	    	$("#"+data_id).css({"opacity":"1"});
	    	$("#"+data_id).next().css({"opacity":"1"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_illinois").css({"opacity":"1"});
	    	break;
	    case "background_2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#down_stream p").css({"color":"#76360b"});
	    	// effects for list items flying in
	    	contentDelay=0;
	    	$("#background_1 ul li").each(function(){
	    		$(this).delay(contentDelay).animate({left:"10%",opacity:"1"},500);
	    		contentDelay+=50;
	    	});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_illinois").css({"opacity":"1"});
	    	break;
	    case "background_3":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_1").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_illinois").css({"opacity":"1"});
	    	break;
	    case "bgd_basic_concept_1":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#background_1").css({"opacity":"0.1"});
	    	$("#bgd_basic_concept_1").css({"opacity":"1"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_basic_concepts").css({"opacity":"1"});
	    	break;
	    case "bgd_basic_concept_2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_1").css({"opacity":"1"});
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_basic_concepts").css({"opacity":"1"});
	    	break;
	    case "bgd_basic_concept_3":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_basic_concepts").css({"opacity":"1"});
	    	break;
	    case "linear_approach_1":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_1").css({"opacity":"0"});
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	$("#background_1").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_lin_approach").css({"opacity":"1"});
	    	break;
	    case "linear_approach_2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_1").css({"opacity":"0"});
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	$("#background_1").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_lin_approach").css({"opacity":"1"});
	    	break;
	    case "disadvantage":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_1").css({"opacity":"0"});
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	$("#background_1").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_lin_approach").css({"opacity":"1"});
	    	break;
	    case "res_goal":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-intro").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_res_goal").css({"opacity":"1"});
	    	break;
	    case "sec_method":
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	break;
	    case "nonlinear_approach_1":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_nonlin_approach").css({"opacity":"1"});
	    	$("#lin_sys").text("Linear system");
	    	break;
	    case "nonlinear_approach_2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"1"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#fig_title_input_freq, #fig_title_output_freq, #lin_input_freq, #lin_output_freq").css({"opacity":0});
	    	$("#lin_module_freq, #fig_title_exp_trend").css({"opacity":0});
	    	// $("#downarrow_lin").css({"-ms-transform":"rotate(0deg)","transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)"})
	    	$("#logo_nonlin_approach").css({"opacity":"1"});
	    	$("#lin_sys").text("Nonlinear system");
	    	// $("#sin_to_change").text("Complicated");
	    	$("#exp_to_change").text("Bounded");
	    	$("#lin_output_freq img").attr({"src":"./images/article/3d-freq.png"});
	    	$("#lin_module_freq img").attr({"src":"./images/article/nonlin-module-freq.svg"});
	    	$("#lin_module img").attr({"src":"./images/article/small-nonlin-order.png"});
	    	change_sin_output();
	    	$("#linear_approach_2").css({"opacity":"1"});
	    	break;
	    case "gen_res":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_gen_res").css({"opacity":"1"});
	    	$("#linear_approach_2").css({"opacity":"0"});
	    	break;
	    case "std_state":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_gen_res").css({"opacity":"1"});
	    	$("#linear_approach_2").css({"opacity":"0"});
	    	break;
	    case "spec_case":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_spe_case").css({"opacity":"1"});
	    	break;
	    case "spec_case2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_spe_case").css({"opacity":"1"});
	    	break;
	    case "spec_case3":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_spe_case").css({"opacity":"1"});
	    	break;
	    case "spec_case4":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_spe_case").css({"opacity":"1"});
	    	break;
	    case "refine":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-method").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_approx").css({"opacity":"1"});
	    	break;
	    case "result":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-experiments").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_results").css({"opacity":"1"});
	    	break;
	    case "result2":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-experiments").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_results").css({"opacity":"1"});
	    	break;
	    case "result3":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-experiments").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_results").css({"opacity":"1"});
	    	break;
	    case "result4":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-experiments").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_results").css({"opacity":"1"});
	    	break;
	    case "disc":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-experiments").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p,#slide_title img").css({"opacity":"0"});
	    	$("#logo_disc").css({"opacity":"1"});
	    	break;
	    case "conclusion":
	    	$("li").removeClass("menu_highlight");
	    	$("#menu-conclusion").addClass("menu_highlight");
	    	$("#bgd_basic_concept_2").css({"opacity":"0"});
	    	$("#slide_title p").css({"opacity":"0"});
	    	$("#logo_illinois").css({"opacity":"1"});
	    	$("#slide_title img").css({"opacity":"1"});
	    	break;
	    case "thank_you":
	    	$("#q_and_a").animate({"right":"5%","opacity":"1"},500)
	    	break;
    };
}, false);

function show_header_footer() {
	// show header and footer
	$("header").animate({top:"0"});
	$(".info_left,.info_right").animate({bottom:"0"});
}

function hide_header_footer() {
	//hide header and footer
	$("header").animate({top:"-"+header_height+"px"});
	$(".info_left,.info_right").animate({bottom:"-"+footer_height+"px"});
}
