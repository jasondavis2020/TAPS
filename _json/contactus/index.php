<?php
require_once substr($_SERVER[SCRIPT_FILENAME],0,strrpos($_SERVER[SCRIPT_FILENAME],'_json')).'_json/app_settings.php';
require_once settings::json;
require_once settings::mymail;

class nsRequest extends reqJson {
	public function process(){
		//var_dump( $this->reqData);
		
		$message = $this->reqData[o]["message"];
		$name = $this->reqData[o]["name"];
		$email = $this->reqData[o]["email"];
		$phone = $this->reqData[o]["phone"];
		$subject = $this->reqData[o]["subject"];

		// To send HTML mail, the Content-type header must be set
		$obj = array();
		$obj["to"] = settings::form_email_address;
		$obj["subject"] = "Contact Us";
		$obj["message"] = "$name\r\n$email\r\n$phone\r\n$subject\r\n$message";
		$obj["headers"] = 'MIME-Version: 1.0' . "\r\n";
		$obj["headers"] .= "From: ".settings::site_name." <contact@".settings::email_domain.">" . "\r\n";
		$obj["headers"] .= "Bcc: jasondavis2020@yahoo.com \r\n";
		
		//var_dump($obj);

		myMail::send($obj);
		$data["rstatus"] = json::ok;
		$data["sendstatus"] = 1;
		$data["message"] = "Thanks for the inquiry. We will respond shortly.";
		
		json::response($data);
	}
}
$nsRequest = new nsRequest;
$nsRequest->process();
?>