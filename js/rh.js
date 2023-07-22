function rh(response, reload_ok = false, reload_before_ok = false, html = false, link_ok = false, link_ok_blank=false) {
    try {
        if (!('status' in response) && !('msg' in response)) {
            return
        }
    } catch {
        return
    }
    if (response['retry']) {
        return
    }
    if (response['status'] == 'ok') {
        if (reload_before_ok) {
            window.location.reload();
        } else {
            if (!html) {
                Swal.fire({
                    icon: 'success',
                    title: 'Удачно!',
                    text: response['msg']
                }).then(function(e) {
                    if (reload_ok) {
                        location.reload();
                    }
                    if (link_ok) {
                        if (link_ok_blank) {
                            window.open(link_ok, '_blank');
                        } else {
                            window.location.href = link_ok;                        
                        }
                    }
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Удачно!',
                    html: html,
                }).then(function(e) {
                    if (reload_ok) {
                        location.reload();
                    }
                    if (link_ok) {
                        if (link_ok_blank) {
                            window.open(link_ok, '_blank');
                        } else {
                            window.location.href = link_ok;                        
                        }
                    }
                });
            }

        }
    } else {
        if (html) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибочка!',
                html: html,
            }).then(function(e) {
                if (reload_ok) {
                    location.reload();
                }
                if (link_ok) {
                    if (link_ok_blank) {
                        window.open(link_ok, '_blank');
                    } else {
                        window.location.href = link_ok;                        
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ошибочка',
                text: response['msg']
            });
        }

    }
}
function response_handler() {
    rh(...arguments)
}