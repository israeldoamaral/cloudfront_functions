function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var file_name = Math.floor((Math.random() * 10) + 1)+ '.png'
    var no_dots = 0
    
    if (request.uri.endsWith('/')) {
        request.uri += file_name;
    } 
    
    else {
        no_dots = (request.uri.split(".").length - 1) 
        if (no_dots == 2)
        
        request.uri = request.uri + '/' + file_name;
    }

    return request;
}