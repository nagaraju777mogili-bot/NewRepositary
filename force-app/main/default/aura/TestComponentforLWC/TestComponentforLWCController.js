({
	recordUpdated: function(cmp,event,helper) {
    var params = event.getParams();

    if(params.changeType === "CHANGED") {
        var changedFields = params.changedFields;
        if (changedFields['Status'].value == 'New') {
            alert('ssssssss');
        }
      }
    }
})