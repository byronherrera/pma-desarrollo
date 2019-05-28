<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Login</title>

    <!-- Ext Core -->
    <script type="text/javascript" src="client/misc/ext-core.js"></script>

    <!-- Login -->
    <link rel="stylesheet" type="text/css" href="resources/css/login.css"/>
    <script type="text/javascript" src="client/misc/cookies.js"></script>
    <script type="text/javascript" src="client/misc/login.js"></script>

</head>

<body>

<div id="qo-panel">
    <div id="qo-panel-login">
        <label id="field1-label" class="qo-abs-position" accesskey="e" for="field1">
            <span class="key">D</span>irección de correo</label>
        <input class="qo-abs-position" type="text" name="field1" id="field1" value=""/>

        <label id="field2-label" class="qo-abs-position" accesskey="p" for="field2"><span
                    class="key">C</span>ontraseña</label>
        <input class="qo-abs-position" type="password" name="field2" id="field2" value=""/>

        <label id="field3-label" class="qo-abs-position" accesskey="g" for="field3" style="display: none;"><span
                    class="key">G</span>roup</label>
        <select class="qo-abs-position" name="field3" id="field3" style="display: none;"></select>

        <input id="submitBtn" class="qo-submit qo-abs-position" type="image" src="resources/images/default/s.gif"/>
    </div>
</div>

</body>
</html>