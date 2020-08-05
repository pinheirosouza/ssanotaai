  // Your Auth Token from www.twilio.com/console



module.exports = twillio = {

    sendMessage: (req, res) => {
        var accountSid = 'ACdb9a88e137d900852372814f6bc1fab3'; // Your Account SID from www.twilio.com/console
        var authToken = 'bbeed96764d53d4b06801c0d3b6cf9cb'; 
        var twilio = require('twilio');
        var client = new twilio(accountSid, authToken); 
        console.log(client)      
        client.messages.create({
            body: 'Hello from Node',
            to: 'whatsapp:+5553991268787' ,  // Text this number
            from: 'whatsapp:+14155238886' // From a valid Twilio number
        })
        .then((message) => console.log(message));

    }
    
}