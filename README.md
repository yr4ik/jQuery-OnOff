jQuery-OnOff
============
Replace checkbox in iphone style.

Options:

		lefttext: 'ON',
		righttext: 'OFF',
		speed: 300,
		boxClass: 'jq-onOff'


examle HTML:

<html xmlns="http://www.w3.org/1999/xhtml" lang="ru-RU">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<title>jquery onOff plugin</title>

<link rel="stylesheet" href="/onOff/onOff.css"/>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="/onOff/onOff.js"></script>

<script type='text/javascript'>
	$(document).ready(function(){
		$('.onOff').onOff();
	});
</script>
</head>
<body>

<input type="checkbox" name="checkbox" class="onOff">
</body>
</html>
