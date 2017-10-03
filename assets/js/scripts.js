
jQuery(function($){
  function reposition() {
    var modal = $(this),
        dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
  }

  $('.modal').on('show.bs.modal', reposition);
  $(window).on('resize', function() {
    $('.modal:visible').each(reposition);
  });

    $('.wpcf7').find('[type="submit"]').on('click', function () {
		$(this).prop('disabled',true);
	});

	$('.wpcf7').on('invalid.wpcf7 mailsent.wpcf7 mailfailed.wpcf7', function (e) {
		$(this).find('[type="submit"]').prop('disabled',false);
	});

  $('.wpcf7').on('mailsent.wpcf7',function(){
    if($('.modal').is(':visible')){
    $('.modal:visible')
    .modal('hide')
    .on('hidden.bs.modal', function(){
      swal({
        title:"Заявка принята!",
        text: "Наш сотрудник перезвонит\nв ближайшее время.",
        type: "success",
        timer: 6000,
        confirmButtonClass: 'btn-rgb',
        buttonsStyling: false,
      });
      $('.modal').off('hidden.bs.modal');
    });
    }else{
      swal({
        title:"Спасибо за сообщение!",
        text: "Наш сотрудник свяжется с Вами \nв ближайшее время.",
        type: "success",
        timer: 6000,
        confirmButtonClass: 'btn-rgb',
        buttonsStyling: false,
      });
    }
  });


  function isVisible( row, container ){
    var elementTop = $(row).offset().top,
        elementHeight = $(row).height(),
        containerTop = container.scrollTop(),
        containerHeight = container.height();

    return ((((elementTop - containerTop) + elementHeight) > 0) && ((elementTop - containerTop) < containerHeight));
  }
  function vivibleblocks(){
    $('.animate_me').each(function(){
      if(isVisible($(this), $(window))){
        $(this).addClass('active');
      };
    });
  }
  vivibleblocks();
  $(window).scroll(function(){
    vivibleblocks();
  });

});
